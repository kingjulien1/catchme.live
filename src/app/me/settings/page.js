import { revalidatePath } from "next/cache";
import { getSessionUser, sql } from "@/lib/db";
import AccountPreferencesSection from "./account-preferences-section";
import AccountOptionsSection from "./account-options-section";
import AccountTypeSection from "./account-type-section";
import BookingSettingsSection from "./booking-settings-section";
import ProfileDisplaySection from "./profile-display-section";

export default async function SettingsPage() {
  const user = await getSessionUser();
  const userId = user?.id;

  let accountOptions = null;
  let bookingSettings = null;
  let profileDisplaySettings = null;
  let bookingRequirements = [];

  if (userId) {
    [accountOptions] = await sql`
      select *
      from user_account_options
      where user_id = ${userId}
      limit 1
    `;
    [bookingSettings] = await sql`
      select *
      from user_booking_settings
      where user_id = ${userId}
      limit 1
    `;
    const requirementRows = await sql`
      select requirement_key
      from user_booking_requirements
      where user_id = ${userId}
    `;
    bookingRequirements = requirementRows.map((row) => row.requirement_key);
    [profileDisplaySettings] = await sql`
      select *
      from user_profile_display_settings
      where user_id = ${userId}
      limit 1
    `;
  }

  async function updateAccountType(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { ok: false, message: "Session expired. Please sign in again." };
    }

    const nextType = formData.get("account_type");
    if (nextType !== "artist" && nextType !== "studio") {
      return { ok: false, message: "Invalid account type selection." };
    }

    await sql`
      update users
      set account_type = ${nextType}, updated_at = now()
      where id = ${sessionUser.id}
    `;

    revalidatePath("/me/settings");
    return { ok: true, message: "" };
  }

  async function updateAccountPreferences(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { ok: false, message: "Session expired. Please sign in again." };
    }

    const parseTags = (value) =>
      (value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const name = formData.get("name")?.toString().trim() || null;
    const location = formData.get("location")?.toString().trim() || null;
    const email = formData.get("email")?.toString().trim() || null;
    const bio = formData.get("bio")?.toString().trim() || null;
    const specialisations = parseTags(formData.get("specialisation"));

    await sql`
      update users
      set
        name = ${name},
        location = ${location},
        email = ${email},
        specialisations = ${specialisations.length ? specialisations : null},
        bio = ${bio},
        updated_at = now()
      where id = ${sessionUser.id}
    `;

    revalidatePath("/me/settings");
    return { ok: true, message: "" };
  }

  async function updateAccountOptions(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { ok: false, message: "Session expired. Please sign in again." };
    }

    const toBool = (value) => value === "true" || value === "on";

    await sql`
      insert into user_account_options (
        user_id,
        public_profile,
        show_availability,
        show_counts,
        dm_requests,
        booking_intros,
        email_updates,
        weekly_digest,
        analytics_sharing,
        updated_at
      )
      values (
        ${sessionUser.id},
        ${toBool(formData.get("settings_public_profile"))},
        ${toBool(formData.get("settings_show_availability"))},
        ${toBool(formData.get("settings_show_counts"))},
        ${toBool(formData.get("settings_dm_requests"))},
        ${toBool(formData.get("settings_booking_intros"))},
        ${toBool(formData.get("settings_email_updates"))},
        ${toBool(formData.get("settings_weekly_digest"))},
        ${toBool(formData.get("settings_analytics"))},
        now()
      )
      on conflict (user_id) do update set
        public_profile = excluded.public_profile,
        show_availability = excluded.show_availability,
        show_counts = excluded.show_counts,
        dm_requests = excluded.dm_requests,
        booking_intros = excluded.booking_intros,
        email_updates = excluded.email_updates,
        weekly_digest = excluded.weekly_digest,
        analytics_sharing = excluded.analytics_sharing,
        updated_at = now()
    `;

    revalidatePath("/me/settings");
    return { ok: true, message: "" };
  }

  async function updateBookingSettings(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { ok: false, message: "Session expired. Please sign in again." };
    }

    const status = formData.get("booking_status");
    const minNotice = formData.get("min_notice");
    const maxAdvance = formData.get("max_advance");
    const depositRequired = formData.get("deposit_required");
    const cancellationPolicy = formData.get("cancellation_policy");
    const requirements = formData.getAll("requirements").map((value) => value.toString());
    const sessionTitles = formData.getAll("session_title").map((value) => value.toString());
    const sessionDurations = formData.getAll("session_duration").map((value) => value.toString());
    const sessionPrices = formData.getAll("session_price").map((value) => value.toString());
    const availableIndices = new Set(formData.getAll("session_available").map((value) => Number(value)));

    if (!["open", "limited", "closed"].includes(status)) {
      return { ok: false, message: "Invalid booking status." };
    }

    await sql`
      insert into user_booking_settings (
        user_id,
        status,
        min_notice,
        max_advance,
        deposit_required,
        cancellation_policy,
        updated_at
      )
      values (
        ${sessionUser.id},
        ${status},
        ${minNotice},
        ${maxAdvance},
        ${depositRequired},
        ${cancellationPolicy},
        now()
      )
      on conflict (user_id) do update set
        status = excluded.status,
        min_notice = excluded.min_notice,
        max_advance = excluded.max_advance,
        deposit_required = excluded.deposit_required,
        cancellation_policy = excluded.cancellation_policy,
        updated_at = now()
    `;

    await sql`
      delete from user_booking_requirements
      where user_id = ${sessionUser.id}
    `;
    for (const key of requirements) {
      await sql`
        insert into user_booking_requirements (user_id, requirement_key, is_enabled)
        values (${sessionUser.id}, ${key}, true)
      `;
    }

    await sql`
      delete from user_booking_session_types
      where user_id = ${sessionUser.id}
    `;
    for (let index = 0; index < sessionTitles.length; index += 1) {
      const title = sessionTitles[index];
      await sql`
        insert into user_booking_session_types (
          user_id,
          title,
          duration_label,
          price_label,
          is_available,
          sort_order
        )
        values (
          ${sessionUser.id},
          ${title},
          ${sessionDurations[index] || null},
          ${sessionPrices[index] || null},
          ${availableIndices.has(index)},
          ${index}
        )
      `;
    }

    revalidatePath("/me/settings");
    return { ok: true, message: "" };
  }

  async function updateProfileDisplay(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { ok: false, message: "Session expired. Please sign in again." };
    }

    const toBool = (value) => value === "true" || value === "on";
    const layoutStyle = formData.get("layout_style")?.toString();

    const bannerImageUrl = formData.get("banner_image_url")?.toString().trim() || null;
    const socialInstagram = formData.get("social_instagram")?.toString().trim() || null;
    const socialFacebook = formData.get("social_facebook")?.toString().trim() || null;
    const socialYoutube = formData.get("social_youtube")?.toString().trim() || null;
    const socialX = formData.get("social_x")?.toString().trim() || null;
    const socialWebsite = formData.get("social_website")?.toString().trim() || null;

    await sql`
      insert into user_profile_display_settings (
        user_id,
        banner_image_url,
        layout_style,
        show_followers,
        show_experience,
        show_location,
        show_socials,
        show_verified,
        social_instagram,
        social_facebook,
        social_youtube,
        social_x,
        social_website,
        updated_at
      )
      values (
        ${sessionUser.id},
        ${bannerImageUrl},
        ${layoutStyle || "grid"},
        ${toBool(formData.get("display_followers"))},
        ${toBool(formData.get("display_experience"))},
        ${toBool(formData.get("display_location"))},
        ${toBool(formData.get("display_socials"))},
        ${toBool(formData.get("display_verified"))},
        ${socialInstagram},
        ${socialFacebook},
        ${socialYoutube},
        ${socialX},
        ${socialWebsite},
        now()
      )
      on conflict (user_id) do update set
        banner_image_url = excluded.banner_image_url,
        layout_style = excluded.layout_style,
        show_followers = excluded.show_followers,
        show_experience = excluded.show_experience,
        show_location = excluded.show_location,
        show_socials = excluded.show_socials,
        show_verified = excluded.show_verified,
        social_instagram = excluded.social_instagram,
        social_facebook = excluded.social_facebook,
        social_youtube = excluded.social_youtube,
        social_x = excluded.social_x,
        social_website = excluded.social_website,
        updated_at = now()
    `;

    revalidatePath("/me/settings");
    return { ok: true, message: "" };
  }

  return (
    <div className="space-y-8">
      <AccountTypeSection user={user} action={updateAccountType} />
      <AccountPreferencesSection user={user} action={updateAccountPreferences} />
      <AccountOptionsSection options={accountOptions} action={updateAccountOptions} />
      <BookingSettingsSection settings={bookingSettings ? { ...bookingSettings, requirements: bookingRequirements } : null} action={updateBookingSettings} />
      <ProfileDisplaySection settings={profileDisplaySettings} action={updateProfileDisplay} user={user} />
    </div>
  );
}
