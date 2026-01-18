"use server";

import { sql } from "@/lib/db";

export async function connectInstagramAction() {
  const nonce = crypto.randomUUID();
  const username = `test_user_${nonce.slice(0, 8)}`;

  await sql`
    insert into users (ig_user_id, username, profile_picture_url)
    values (${nonce}, ${username}, ${null})
  `;
}
