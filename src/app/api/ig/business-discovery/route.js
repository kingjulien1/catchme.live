import { NextResponse } from "next/server";
import { fetchInstagramBusinessDiscovery } from "@/app/me/visit/instagram-actions";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const result = await fetchInstagramBusinessDiscovery(username);

  const statusMap = {
    missing_username: 400,
    unauthorized: 401,
    missing_ig_user_id: 400,
    missing_token: 500,
    instagram_error: 400,
  };
  const status = result.ok ? 200 : statusMap[result.error] || 400;

  return NextResponse.json(result, { status });
}
