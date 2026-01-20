import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, sql } from "@/lib/db";
import { hashToken } from "@/lib/utils";

async function handleLogout(req) {
  const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { searchParams } = new URL(req.url);
  const redirectTo = searchParams.get("redirect") || "/";
  const res = NextResponse.redirect(new URL(redirectTo, req.url));

  if (sessionToken) {
    const tokenHash = await hashToken(sessionToken);
    const [session] = await sql`
      select user_id
      from sessions
      where token_hash = ${tokenHash}
      limit 1
    `;

    await sql`
      delete from sessions
      where token_hash = ${tokenHash}
    `;

    if (session?.user_id) {
      await sql`
        delete from instagram_tokens
        where user_id = ${session.user_id}
      `;
    }
  }

  res.cookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;
}

export async function POST(req) {
  return handleLogout(req);
}

export async function GET(req) {
  return handleLogout(req);
}
