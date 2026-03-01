import { getProfileByUsername, sql } from "@/lib/db";
import { notFound } from "next/navigation";
import VisitDialog from "./visit-dialog";

export default async function ArtistVisitPage({ params }) {
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
      destination.username as destination_username,
      linked_accounts.linked_accounts as linked_accounts
    from visits
    left join lateral (
      select coalesce(
        json_agg(
          json_build_object(
            'id', vla.id,
            'account_user_id', vla.account_user_id,
            'account_handle', vla.account_handle,
            'account_type', vla.account_type,
            'created_at', vla.created_at,
            'name', u.name,
            'username', u.username
          )
          order by vla.created_at asc
        ),
        '[]'::json
      ) as linked_accounts
      from visit_linked_accounts vla
      left join users u on u.id = vla.account_user_id
      where vla.visit_id = visits.id
    ) as linked_accounts on true
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
