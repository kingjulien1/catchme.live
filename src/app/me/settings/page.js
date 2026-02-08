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
  let instagramToken = null;
  let instagramSyncSettings = null;
  const bookingRequirementOptions = [
    { id: "req-reference", label: "Require reference images", defaultChecked: true },
    { id: "req-placement", label: "Request placement location", defaultChecked: true },
    { id: "req-size", label: "Ask for size estimate", defaultChecked: true },
    { id: "req-history", label: "Require previous tattoo info", defaultChecked: false },
    { id: "req-budget", label: "Request budget range", defaultChecked: true },
    { id: "req-colors", label: "Ask for preferred color palette", defaultChecked: false },
  ];

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
    <div className="space-y-12">
      <InstagramConnectionSection user={user} instagramToken={instagramToken} settings={instagramSyncSettings} action={updateInstagramSyncSettings} />
      <AccountTypeSection user={user} action={updateAccountType} />
      <AccountPreferencesSection user={user} action={updateAccountPreferences} />
      <ProfileDisplaySection settings={profileDisplaySettings} action={updateProfileDisplay} user={user} />
      <BookingSettingsSection settings={bookingSettings} requirements={bookingRequirementOptions} action={updateBookingSettings} />
      <AccountOptionsSection key={accountOptions?.updated_at ?? "default"} options={accountOptions} action={updateAccountOptions} />
    </div>
  );
}
