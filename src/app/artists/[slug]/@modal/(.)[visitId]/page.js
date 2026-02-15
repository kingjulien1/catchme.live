import { notFound } from "next/navigation";
import { getProfileByUsername, sql } from "@/lib/db";
import VisitDialog from "../../[visitId]/visit-dialog";

export default async function ArtistVisitModal({ params }) {
  const { slug, visitId } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";
  if (!handle || !visitId) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const [visit] = await sql`
    select
      visits.id,
      visits.visit_location,
      visits.visit_start_time,
      visits.visit_end_time,
      visits.visit_type,
      visit_options.special_notes as description,
      destination_link.account_handle as destination_instagram_handle,
      destination.name as destination_name,
      destination.username as destination_username
    from visits
    left join lateral (
      select account_handle, account_user_id
      from visit_linked_accounts
      where visit_id = visits.id
        and account_type = 'destination'
      order by created_at asc
      limit 1
    ) as destination_link on true
    left join users as destination on destination.id = destination_link.account_user_id
    left join visit_options on visit_options.visit_id = visits.id
    where visits.id = ${visitId}
      and visits.author_user_id = ${profile.id}
    limit 1
  `;

  if (!visit) notFound();

  return <VisitDialog visit={visit} slug={handle} scrollKey={`artist-scroll-${handle}`} />;
}
