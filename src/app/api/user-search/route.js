import { NextResponse } from "next/server";

import { sql } from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username")?.trim();

  if (!username) {
    return NextResponse.json({ ok: false, error: "missing_username" }, { status: 400 });
  }

  const [user] = await sql`
    select
      id,
      ig_user_id,
      ig_scoped_user_id,
      username,
      name,
      account_type,
      profile_picture_url,
      followers_count,
      media_count,
      location
    from users
    where lower(username) = lower(${username})
    limit 1
  `;

  return NextResponse.json({
    ok: true,
    exists: Boolean(user),
    profile: user || null,
  });
}
