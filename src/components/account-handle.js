import { getProfileByUsername } from "@/lib/db";
import AccountHandleClient from "@/components/account-handle-client";

export default async function AccountHandle({ username, className = "" }) {
  const normalized = username ? username.replace(/^@/, "") : "";
  const profile = normalized ? await getProfileByUsername(normalized) : null;

  return (
    <AccountHandleClient
      username={normalized || username}
      name={profile?.name || null}
      profilePictureUrl={profile?.profile_picture_url || null}
      followersCount={profile?.followers_count ?? null}
      accountType={profile?.account_type || null}
      mediaCount={profile?.media_count ?? null}
      bio={profile?.bio || null}
      className={className}
    />
  );
}
