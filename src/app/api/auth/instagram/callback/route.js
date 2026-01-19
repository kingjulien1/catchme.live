/**
 * Instagram OAuth Callback Route
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
 * @link https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
 */
import crypto from "crypto";
import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

const SESSION_TTL_DAYS = 30;

function hashToken(token) {
  // Store a hash so the raw session token is never persisted.
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Exchanges an Instagram OAuth authorization code for a short-lived access token
 * by calling the Instagram OAuth access_token endpoint.
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
 * @link https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
 *
 * @param {string} code - One-time authorization code returned by Instagram to the redirect URI.
 * @returns {Promise<{access_token: string, user_id: number, permissions: Array<"instagram_business_basic"|"instagram_business_manage_messages"|"instagram_business_content_publish"|"instagram_business_manage_insights"|"instagram_business_manage_comments">}>} Token payload, e.g.
 * {
 *   access_token: "IGAAaZCyOJEPo5BZAGF5WG51VXlLSFF0N01PakhRcU04SjNKZAkVOUWpiOWpkNktvREZAGZAFctWkU4Ny05VzdyZA1V5VWQ4RHN4UE9HblAwWjBUeHA2MlV5OU5MalhHNjV5WWp3YW9lekNiWlZAXY1hNZAEJ2WVF2bkczOU9EdDd0aFJmbmJWNi0wTDVxbFkyMFBpdlhpc25WYgZDZD",
 *   user_id: 25568454926143110,
 *   permissions: [
 *     "instagram_business_basic",
 *     "instagram_business_manage_messages",
 *     "instagram_business_content_publish",
 *     "instagram_business_manage_insights",
 *     "instagram_business_manage_comments"
 *   ]
 * }
 */
async function exchangeCodeForShortLivedToken(code) {
  // Build the OAuth token exchange request with required form fields.
  const uri = new URL("https://api.instagram.com/oauth/access_token");
  const formData = new FormData();
  formData.set("client_id", process.env.IG_APP_CLIENT_ID);
  formData.set("client_secret", process.env.IG_APP_CLIENT_SECRET);
  formData.set("grant_type", "authorization_code");
  formData.set("redirect_uri", process.env.IG_REDIRECT_URI);
  formData.set("code", code);

  // Instagram expects a POST with multipart form data.
  const res = await fetch(uri.toString(), {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    // Surface the raw response body for easier debugging.
    const errorBody = await res.text();
    const errorDetails = { function: "exchangeCodeForShortLivedToken", status: res.status, statusText: res.statusText, body: errorBody };
    console.error("Instagram token exchange failed", errorDetails);
    throw new Error(`Instagram token exchange failed: ${JSON.stringify(errorDetails)}`);
  }

  const data = await res.json();
  return data;
}

/**
 * Exchanges a short-lived Instagram access token for a long-lived access token
 * by calling the Graph API access_token endpoint.
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
 *
 * @param {string} shortLivedToken - Short-lived Instagram access token to exchange.
 * @returns {Promise<{access_token: string, token_type: string, expires_in: number}>} Token payload, e.g.
 * {
 *   access_token: "IGQVJ...",
 *   token_type: "bearer",
 *   expires_in: 5183944
 * }
 */
async function exchangeShortLivedTokenForLongLivedToken(shortLivedToken) {
  // Exchange the short-lived token for a long-lived token via the Graph API.
  const uri = new URL("https://graph.instagram.com/access_token");
  uri.searchParams.set("grant_type", "ig_exchange_token");
  uri.searchParams.set("client_secret", process.env.IG_APP_CLIENT_SECRET);
  uri.searchParams.set("access_token", shortLivedToken);

  const res = await fetch(uri.toString(), { method: "GET" });

  if (!res.ok) {
    // Surface the raw response body for easier debugging.
    const errorBody = await res.text();
    const errorDetails = {
      function: "exchangeShortLivedTokenForLongLivedToken",
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    };
    console.error("Instagram long-lived token exchange failed", errorDetails);
    throw new Error(`Instagram long-lived token exchange failed: ${JSON.stringify(errorDetails)}`);
  }

  const data = await res.json();
  return data;
}

/**
 * Fetches the Instagram user profile for the authenticated user using a long-lived access token.
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started
 *
 * @param {string} accessToken - Long-lived Instagram access token.
 * @returns {Promise<{id: string, user_id?: string, username: string, name?: string, account_type?: string, profile_picture_url?: string, followers_count?: number, media_count?: number}>} User profile payload, e.g.
 * {
 *   id: "17841400000000000",
 *   user_id: "17841400000000000",
 *   username: "instagram_user",
 *   name: "Instagram User",
 *   account_type: "BUSINESS",
 *   profile_picture_url: "https://example.com/profile.jpg",
 *   followers_count: 1234,
 *   media_count: 42
 * }
 */
async function fetchInstagramUserProfile(accessToken) {
  // Fetch the authenticated user's profile fields from the Graph API.
  const uri = new URL("https://graph.instagram.com/me");
  uri.searchParams.set("fields", "id,user_id,username,name,account_type,profile_picture_url,followers_count,media_count");
  uri.searchParams.set("access_token", accessToken);

  const res = await fetch(uri.toString(), { method: "GET" });

  if (!res.ok) {
    // Surface the raw response body for easier debugging.
    const errorBody = await res.text();
    const errorDetails = {
      function: "fetchInstagramUserProfile",
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    };
    console.error("Instagram user profile fetch failed", errorDetails);
    throw new Error(`Instagram user profile fetch failed: ${JSON.stringify(errorDetails)}`);
  }

  const data = await res.json();
  return data;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const cookieState = req.cookies.get("ig_oauth_state")?.value || null;
  const redirectTo = req.cookies.get("ig_oauth_redirect")?.value || "/create-new-visit";

  // Ensure we have the authorization code to proceed.
  if (!code) return NextResponse.json({ ok: false, error: "missing_code" }, { status: 400 });
  // Require the CSRF cookie since Instagram may omit the state param.
  if (!cookieState) return NextResponse.json({ ok: false, error: "missing_state_cookie" }, { status: 400 });

  // Instagram may not return the state param; rely on the cookie presence as the CSRF check.

  // Exchange code -> short-lived token -> long-lived token, then fetch profile.
  const tokenData = await exchangeCodeForShortLivedToken(code);
  const longLivedTokenData = await exchangeShortLivedTokenForLongLivedToken(tokenData.access_token);
  const userProfile = await fetchInstagramUserProfile(longLivedTokenData.access_token);

  // Upsert the user by Instagram ID and keep profile fields updated.
  const [user] = await sql`
    insert into users (
      ig_user_id,
      ig_scoped_user_id,
      username,
      name,
      account_type,
      profile_picture_url,
      followers_count,
      media_count
    )
    values (
      ${userProfile.id},
      ${userProfile.user_id || null},
      ${userProfile.username},
      ${userProfile.name || null},
      ${userProfile.account_type || null},
      ${userProfile.profile_picture_url || null},
      ${userProfile.followers_count ?? null},
      ${userProfile.media_count ?? null}
    )
    on conflict (ig_user_id) do update
    set
      ig_scoped_user_id = excluded.ig_scoped_user_id,
      username = excluded.username,
      name = excluded.name,
      account_type = excluded.account_type,
      profile_picture_url = excluded.profile_picture_url,
      followers_count = excluded.followers_count,
      media_count = excluded.media_count,
      updated_at = now()
    returning id
  `;

  const userId = user?.id;
  if (!userId) {
    throw new Error("Failed to upsert user");
  }

  // Convert expires_in (seconds) to a timestamp for storage.
  const tokenExpiresAt = longLivedTokenData?.expires_in ? new Date(Date.now() + longLivedTokenData.expires_in * 1000) : null;

  // Upsert the long-lived token for this user.
  await sql`
    insert into instagram_tokens (user_id, access_token_encrypted, token_expires_at, updated_at)
    values (${userId}, ${longLivedTokenData.access_token}, ${tokenExpiresAt}, now())
    on conflict (user_id) do update
    set
      access_token_encrypted = excluded.access_token_encrypted,
      token_expires_at = excluded.token_expires_at,
      updated_at = now()
  `;

  // Create a new session record and set the session cookie.
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const sessionTokenHash = hashToken(sessionToken);
  const sessionExpiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);

  await sql`
    insert into sessions (user_id, token_hash, expires_at)
    values (${userId}, ${sessionTokenHash}, ${sessionExpiresAt})
  `;

  // Redirect back to the original page and clear OAuth cookies.
  const redirectUrl = new URL(redirectTo, req.url);
  const res = NextResponse.redirect(redirectUrl);
  const defaultParams = { httpOnly: true, secure: true, sameSite: "lax", path: "/" };
  // set session cookie for further requests that require authentication
  res.cookies.set("session", sessionToken, { ...defaultParams, maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 });

  // clear OAuth cookies
  res.cookies.set("ig_oauth_state", "", { ...defaultParams, maxAge: 0 });
  res.cookies.set("ig_oauth_redirect", "", { ...defaultParams, maxAge: 0 });

  return res;
}
