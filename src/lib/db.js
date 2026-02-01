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
 *   instagram_token_updated_at: string | null,
 *   display_name: string | null,
 *   location: string | null,
 *   email: string | null,
 *   specialisations: string[] | null,
 *   bio: string | null
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
      instagram_tokens.updated_at as instagram_token_updated_at,
      users.display_name,
      users.location,
      users.email,
      users.specialisations,
      users.bio
    from sessions
    join users on users.id = sessions.user_id
    left join instagram_tokens on instagram_tokens.user_id = users.id
    where sessions.token_hash = ${tokenHash}
      and sessions.expires_at > now()
    limit 1
  `;

  return user || null;
}

/**
 * Fetches a public profile by username (case-insensitive).
 *
 * Behavior:
 * - Normalizes the provided username by trimming whitespace.
 * - Performs a case-insensitive lookup on `users.username`.
 * - Returns `null` when no matching profile exists.
 *
 * @param {string} username
 *   The Instagram handle/username to look up (with or without @ prefix).
 * @returns {Promise<null | {
 *   id: string,
 *   username: string,
 *   name: string | null,
 *   profile_picture_url: string | null,
 *   followers_count: number | null,
 *   media_count: number | null,
 *   account_type: string | null,
 *   created_at: string
 * }>}
 *   The user profile record when found, otherwise `null`.
 */
export async function getProfileByUsername(username) {
  if (!username) return null;
  const normalized = username.trim().replace(/^@/, "");
  if (!normalized) return null;

  const [profile] = await sql`
    select
      id,
      username,
      name,
      bio,
      profile_picture_url,
      followers_count,
      media_count,
      account_type,
      location,
      specialisations,
      created_at,
      user_profile_display_settings.banner_image_url
    from users
    left join user_profile_display_settings
      on user_profile_display_settings.user_id = users.id
    where lower(username) = lower(${normalized})
    limit 1
  `;

  return profile || null;
}

/**
 * Fetches the latest visits for a specific user.
 *
 * Behavior:
 * - Returns visits ordered by `visit_start_time` (latest first).
 * - Limits the result set to the provided `limit` (defaults to 25).
 * - Joins the destination user (if present) to include profile details.
 *
 * @param {string} userId
 *   The author user ID to fetch visits for.
 * @param {number} [limit=25]
 *   Maximum number of visits to return.
 * @returns {Promise<Array<{
 *   id: string,
 *   visit_location: string,
 *   visit_start_time: string | null,
 *   visit_end_time: string | null,
 *   visit_type: string,
 *   description: string | null,
 *   bookings_open: boolean,
 *   appointment_only: boolean,
 *   age_18_plus: boolean,
 *   deposit_required: boolean,
 *   digital_payments: boolean,
 *   custom_requests: boolean,
 *   destination_instagram_handle: string | null,
 *   destination_profile_picture_url: string | null,
 *   destination_name: string | null,
 *   destination_username: string | null,
 *   destination_banner_image_url: string | null,
 *   destination_followers_count: number | null,
 *   destination_account_type: string | null,
 *   destination_media_count: number | null,
 *   destination_bio: string | null
 * }>>}
 *   List of visit records for the user, newest first.
 */
export async function getUserVisits(userId, limit = 25) {
  if (!userId) return [];

  const visits = await sql`
    select
      visits.id,
      visits.visit_location,
      visits.visit_start_time,
      visits.visit_end_time,
      visits.visit_type,
      visits.description,
      visits.bookings_open,
      visits.appointment_only,
      visits.age_18_plus,
      visits.deposit_required,
      visits.digital_payments,
      visits.custom_requests,
      visits.destination_instagram_handle,
      author.profile_picture_url as author_profile_picture_url,
      author.name as author_name,
      author.username as author_username,
      author.followers_count as author_followers_count,
      author.account_type as author_account_type,
      author.media_count as author_media_count,
      author.bio as author_bio,
      destination.profile_picture_url as destination_profile_picture_url,
      destination.name as destination_name,
      destination.username as destination_username,
      destination.followers_count as destination_followers_count,
      destination.account_type as destination_account_type,
      destination.media_count as destination_media_count,
      destination.bio as destination_bio,
      destination_settings.banner_image_url as destination_banner_image_url
    from visits
    left join users as author on author.id = visits.author_user_id
    left join users as destination on destination.id = visits.destination_user_id
    left join user_profile_display_settings as destination_settings on destination_settings.user_id = destination.id
    where visits.author_user_id = ${userId}
    order by visits.visit_start_time desc nulls last
    limit ${limit}
  `;

  return visits || [];
}
