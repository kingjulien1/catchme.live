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
  }

  return (
    <div className="space-y-8">
      <AccountTypeSection user={user} />
      <AccountPreferencesSection user={user} />
      <AccountOptionsSection options={accountOptions} />
      <BookingSettingsSection settings={bookingSettings} />
      <ProfileDisplaySection settings={profileDisplaySettings} />
    </div>
  );
}
