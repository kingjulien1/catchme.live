import { clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

/**
 * Merge and normalize conditional class name values into a single string.
 *
 * This helper combines `clsx` (for conditional/array/object class inputs)
 * with `tailwind-merge` (to resolve conflicting Tailwind utility classes).
 *
 * @param {...(string | number | null | undefined | false | Record<string, boolean> | Array<unknown>)} inputs
 *   Class name values to combine; accepts strings, arrays, objects, and falsy values.
 * @returns {string}
 *   A single class name string with conflicts resolved (e.g., the last Tailwind utility wins).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Hash a session token using SHA-256 for secure comparison/storage.
 *
 * This is designed for storing/verifying tokens without persisting raw values.
 * The output is a lowercase hexadecimal string.
 *
 * @param {string} token
 *   Raw token string (e.g., a session cookie value).
 * @returns {Promise<string>}
 *   The SHA-256 hash of the token as a hex string.
 */
export async function hashToken(token) {
  const data = new TextEncoder().encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Format a follower count into a compact, human-friendly label.
 *
 * @param {number | null | undefined} count
 *   Numeric follower count from Instagram or the database.
 * @returns {string}
 *   A compact label like "2.4K followers" or a fallback "- followers" when missing.
 */
export function formatFollowers(count) {
  if (typeof count !== "number") return "- followers";
  return `${new Intl.NumberFormat("en-US", { notation: "compact" }).format(count)} followers`;
}

/**
 * Convert a visit type key into a title-cased display label.
 *
 * @param {string | null | undefined} value
 *   Internal visit type value (e.g., "guest", "workshop", "custom").
 * @returns {string}
 *   Title-cased label for UI display, or "Visit" when the value is missing.
 */
export function formatVisitType(value) {
  return value ? value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Visit";
}

/**
 * Format a visit date range for display.
 *
 * @param {Date | null | undefined} start
 *   Visit start date.
 * @param {Date | null | undefined} end
 *   Visit end date; optional.
 * @returns {string}
 *   A date range like "Mar 12, 2025 – Mar 18, 2025", or "Open end" when no end is provided.
 */
export function formatVisitDateRange(start, end) {
  if (!start) return "TBD";
  const startLabel = format(start, "MMM d, yyyy");
  if (!end) return `${startLabel} · Open end`;
  return `${startLabel} – ${format(end, "MMM d, yyyy")}`;
}

/**
 * Format a visit time range for display.
 *
 * @param {Date | null | undefined} start
 *   Visit start datetime.
 * @param {Date | null | undefined} end
 *   Visit end datetime; optional.
 * @returns {string}
 *   A time range like "10:00 AM – 6:00 PM", or "Open end" when no end is provided.
 */
export function formatVisitTimeRange(start, end) {
  if (!start) return "TBD";
  const startLabel = format(start, "h:mm a");
  if (!end) return `${startLabel} · Open end`;
  return `${startLabel} – ${format(end, "h:mm a")}`;
}

/**
 * Format a single date as a short label.
 *
 * @param {Date | null | undefined} value
 *   Date value to format.
 * @returns {string}
 *   A short date label like "Mar 12, 2025", or "—" if no date is provided.
 */
export function formatShortDate(value) {
  if (!value) return "—";
  return format(value, "MMM d, yyyy");
}
