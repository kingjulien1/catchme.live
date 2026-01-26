import { NextResponse } from "next/server";
import crypto from "crypto";

// https://www.instagram.com/oauth/authorize?force_reauth=true
//    &client_id=1899719370751630
//    &redirect_uri=https://catchme-live.vercel.app/create-new-visit
//    &response_type=code
//    &scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights

export async function GET(req) {
  const state = crypto.randomBytes(24).toString("hex");

  const authUrl = new URL("https://www.instagram.com/oauth/authorize");
  authUrl.searchParams.set("force_reauth", "true");
  authUrl.searchParams.set("client_id", process.env.IG_CLIENT_ID);

  // build callback with state
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const redirectUri = process.env.IG_REDIRECT_URI ? new URL(process.env.IG_REDIRECT_URI) : new URL("/api/auth/instagram/callback", baseUrl);
  redirectUri.searchParams.set("state", state);
  authUrl.searchParams.set("redirect_uri", redirectUri.toString());
  console.log("CALLBACK URI", redirectUri.toString());

  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish,instagram_business_manage_insights");

  const res = NextResponse.redirect(authUrl.toString());

  res.cookies.set("ig_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10,
  });

  return res;
}
