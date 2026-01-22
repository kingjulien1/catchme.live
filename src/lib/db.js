import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { hashToken } from "@/lib/utils";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

export const sql = neon(databaseUrl);

export default sql;

export const SESSION_COOKIE_NAME = "session";

export const SESSION_TTL_DAYS = 30;

/**
 * Resolves the current session's user based on the httpOnly session cookie.
 *
 * Behavior:
 * - Reads the `session` cookie from the incoming request.
 * - Hashes the cookie value (raw token) to compare against `sessions.token_hash`.
 * - Joins `sessions` with `users`, returning the first non-expired match.
 * - Returns `null` when the cookie is missing or the session is invalid/expired.
 *
 * @returns {Promise<null | {
 *   id: string,
 *   username: string,
 *   name: string | null,
 *   profile_picture_url: string | null,
 *   followers_count: number | null,
 *   account_type: string | null,
 *   media_count: number | null,
 *   instagram_token_updated_at: string | null
 * }>} User record for the active session, or null when no valid session exists.
 */
export async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const tokenHash = await hashToken(sessionToken);
  const [user] = await sql`
    select
      users.id,
      users.username,
      users.name,
      users.profile_picture_url,
      users.followers_count,
      users.account_type,
      users.media_count,
      instagram_tokens.updated_at as instagram_token_updated_at
    from sessions
    join users on users.id = sessions.user_id
    left join instagram_tokens on instagram_tokens.user_id = users.id
    where sessions.token_hash = ${tokenHash}
      and sessions.expires_at > now()
    limit 1
  `;

  return user || null;
}
