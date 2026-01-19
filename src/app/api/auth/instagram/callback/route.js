/**
 * Instagram OAuth Callback Route
 *
 * @link https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
 * @link https://developers.facebook.com/docs/instagram-basic-display-api/getting-started
 */
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  console.log("Instagram OAuth Callback received code:", code);

  return NextResponse.json({ ok: true });
}
