import { getSessionUser, sql } from "@/lib/db";
import AccountPreferencesSection from "./account-preferences-section";
import AccountOptionsSection from "./account-options-section";
import AccountTypeSection from "./account-type-section";
import BookingSettingsSection from "./booking-settings-section";
import ProfileDisplaySection from "./profile-display-section";
import InstagramConnectionSection from "./instagram-connection-section";
import { updateAccountOptions, updateAccountPreferences, updateAccountType, updateBookingSettings, updateInstagramSyncSettings, updateProfileDisplay } from "./actions";

export default async function SettingsPage() {
  const user = await getSessionUser();
  const userId = user?.id;

  let accountOptions = null;
  let bookingSettings = null;
  let profileDisplaySettings = null;
  let bookingRequirements = [];
  let instagramToken = null;
  let instagramSyncSettings = null;

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
    [instagramToken] = await sql`
      select *
      from instagram_tokens
      where user_id = ${userId}
      limit 1
    `;
    [instagramSyncSettings] = await sql`
      select *
      from instagram_sync_settings
      where user_id = ${userId}
      limit 1
    `;
  }

  return (
    <div className="space-y-8">
      <InstagramConnectionSection user={user} instagramToken={instagramToken} settings={instagramSyncSettings} action={updateInstagramSyncSettings} />
      <AccountTypeSection user={user} action={updateAccountType} />
      <AccountPreferencesSection user={user} action={updateAccountPreferences} />
      <ProfileDisplaySection settings={profileDisplaySettings} action={updateProfileDisplay} user={user} />
      <BookingSettingsSection settings={bookingSettings ? { ...bookingSettings, requirements: bookingRequirements } : null} action={updateBookingSettings} />
      <AccountOptionsSection key={accountOptions?.updated_at ?? "default"} options={accountOptions} action={updateAccountOptions} />
    </div>
  );
}
