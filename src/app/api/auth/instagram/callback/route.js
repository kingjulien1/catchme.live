/**
 * Instagram OAuth callback handler for finishing the login flow.
 *
 * Flow:
 * 1) Validate the OAuth state cookie (Instagram may omit the state query param).
 * 2) Exchange the authorization code for a short-lived token.
 * 3) Exchange the short-lived token for a long-lived token.
 * 4) Fetch the Instagram user profile data.
 * 5) Upsert the user, store the long-lived token, and create a session.
 * 6) Set the session cookie and redirect back to the original page.
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
 * @link https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
 */
import { SESSION_COOKIE_NAME, SESSION_TTL_DAYS, sql } from "@/lib/db";
import { exchangeCodeForShortLivedToken, exchangeShortLivedTokenForLongLivedToken, fetchInstagramUserProfile } from "@/lib/instagram";
import { hashToken } from "@/lib/utils";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const cookieState = req.cookies.get("ig_oauth_state")?.value || null;
  const redirectTo = req.cookies.get("ig_oauth_redirect")?.value || "/me";

  // Ensure we have the authorization code to proceed.
  if (!code) return NextResponse.json({ ok: false, error: "missing_code" }, { status: 400 });
  // Require the CSRF cookie since Instagram may omit the state param.
  if (!cookieState) return NextResponse.json({ ok: false, error: "missing_state_cookie" }, { status: 400 });

  // Instagram may not return the state param; rely on the cookie presence as the CSRF check.

  // Exchange code -> short-lived token -> long-lived token, then fetch profile.
  const tokenData = await exchangeCodeForShortLivedToken(code);
  const longLivedTokenData = await exchangeShortLivedTokenForLongLivedToken(tokenData.access_token);
  const userProfile = await fetchInstagramUserProfile(longLivedTokenData.access_token);
  console.log("TOKEN", longLivedTokenData.access_token);

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

  // Upsert the long-lived token for this user (stored in plaintext for now).
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
  const sessionTokenHash = await hashToken(sessionToken);
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
  res.cookies.set(SESSION_COOKIE_NAME, sessionToken, { ...defaultParams, maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 });
  // clear OAuth cookies
  res.cookies.set("ig_oauth_state", "", { ...defaultParams, maxAge: 0 });
  res.cookies.set("ig_oauth_redirect", "", { ...defaultParams, maxAge: 0 });

  return res;
}
