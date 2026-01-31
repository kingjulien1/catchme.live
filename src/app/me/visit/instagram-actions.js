"use server";

import { getSessionUser, sql } from "@/lib/db";

export async function fetchInstagramBusinessDiscovery(username) {
  const trimmed = username?.trim().replace(/^@/, "");
  if (!trimmed) {
    return { ok: false, error: "missing_username" };
  }

  const sessionUser = await getSessionUser();
  if (!sessionUser?.id) {
    return { ok: false, error: "unauthorized" };
  }

  const [user] = await sql`
    select ig_user_id
    from users
    where id = ${sessionUser.id}
    limit 1
  `;

  if (!user?.ig_user_id) {
    return { ok: false, error: "missing_ig_user_id" };
  }

  const [tokenRow] = await sql`
    select access_token_encrypted
    from instagram_tokens
    where user_id = ${sessionUser.id}
    limit 1
  `;

  const token = tokenRow?.access_token_encrypted;
  console.log("TOKEN", token);
  if (!token) {
    return { ok: false, error: "missing_token" };
  }

  const fields = `business_discovery.username(${trimmed}){id,username,name,profile_picture_url,followers_count,media_count}`;
  const url = `https://graph.facebook.com/v20.0/${user.ig_user_id}?fields=${encodeURIComponent(fields)}&access_token=${encodeURIComponent(token)}`;

  const response = await fetch(url, { cache: "no-store" });
  console.log("RESPONSE", response);
  const data = await response.json();

  console.log("DATA", data);

  if (!response.ok) {
    return { ok: false, error: "instagram_error", details: data };
  }

  const profile = data?.business_discovery || null;

  return { ok: true, exists: Boolean(profile), profile };
}
