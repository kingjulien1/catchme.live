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
export async function exchangeCodeForShortLivedToken(code) {
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
export async function exchangeShortLivedTokenForLongLivedToken(shortLivedToken) {
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
export async function fetchInstagramUserProfile(accessToken) {
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
