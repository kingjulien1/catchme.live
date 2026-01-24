import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getSessionUser, sql } from "@/lib/db";
import { formatShortDate, formatVisitDateRange, formatVisitTimeRange, formatVisitType } from "@/lib/utils";
import { Archive, CalendarDays, Clock, Copy, MapPin, MoreHorizontal, Pencil, Tag, Trash2, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";

export default async function VisitsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/me");
  }

  const visits = await sql`
    select
      visits.id,
      visits.destination_instagram_handle,
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
      visits.status,
      visits.created_at,
      visits.updated_at,
      destination.username as destination_username,
      destination.name as destination_name,
      destination.profile_picture_url as destination_profile_picture_url,
      destination.followers_count as destination_followers_count,
      destination.account_type as destination_account_type,
      destination.media_count as destination_media_count
    from visits
    left join users as destination on destination.id = visits.destination_user_id
    where visits.author_user_id = ${user.id}
    order by visits.visit_start_time desc nulls last, visits.created_at desc
  `;

  return (
    <div className="w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">Your Visits</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Manage upcoming visits, edit details, and keep your availability updated.</p>
      </div>

      {visits.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 p-10 text-sm text-center text-gray-500 border border-gray-300 border-dashed rounded-2xl bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-400">
          <p>No visits yet. Create your first one to get discovered.</p>
          <Link href="/me/visit" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
            Create a visit
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {visits.map((visit) => {
            const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
            const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
            const handle = visit.destination_instagram_handle?.startsWith("@") ? visit.destination_instagram_handle : `@${visit.destination_instagram_handle}`;
            const displayName = visit.destination_name || visit.destination_username || handle.replace(/^@/, "");

            return (
              <article key={visit.id} className="p-5 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:border-gray-300 dark:border-slate-800/80 dark:bg-slate-900/70 dark:hover:border-slate-700">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden bg-gray-100 border border-gray-200 rounded-full dark:border-slate-700 dark:bg-slate-800">
                        {visit.destination_profile_picture_url ? (
                          <img src={visit.destination_profile_picture_url} alt={handle} className="object-cover w-full h-full" />
                        ) : (
                          <div className="grid w-full h-full text-gray-400 place-items-center dark:text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{displayName}</p>
                        <AccountHandle username={handle} className="text-lg" />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {visit.visit_location}
                      </span>
                      <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:inline-block" />
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatVisitDateRange(start, end)}
                      </span>
                      <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:inline-block" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatVisitTimeRange(start, end)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                    <Badge className="border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/10 dark:text-violet-200">
                      <Tag className="w-3 h-3" />
                      {formatVisitType(visit.visit_type)}
                    </Badge>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="w-7 h-7 border border-transparent rounded-full hover:border-gray-200 dark:hover:border-slate-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                          <Pencil className="w-4 h-4" />
                          Edit visit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {visit.description ? <p className="mt-4 text-sm text-gray-600 dark:text-slate-300">{visit.description}</p> : null}

                <div className="flex flex-wrap gap-2 mt-4 text-xs text-gray-600 dark:text-slate-300">
                  {visit.bookings_open ? <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">Bookings open</Badge> : null}
                  {visit.appointment_only ? <Badge className="border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Appointment only</Badge> : null}
                  {visit.age_18_plus ? <Badge className="border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">18+ only</Badge> : null}
                  {visit.deposit_required ? <Badge className="border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Deposit required</Badge> : null}
                  {visit.digital_payments ? <Badge className="border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Digital payments</Badge> : null}
                  {visit.custom_requests ? <Badge className="border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">Custom requests</Badge> : null}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-xs text-gray-500 dark:text-slate-400">
                  <span>Created {formatShortDate(visit.created_at ? new Date(visit.created_at) : null)}</span>
                  <span>Updated {formatShortDate(visit.updated_at ? new Date(visit.updated_at) : null)}</span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
