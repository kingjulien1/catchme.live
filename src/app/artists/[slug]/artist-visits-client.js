"use client";

import { useEffect, useMemo, useState } from "react";
import LiveCard from "@/components/live-card";
import { Separator } from "@/components/ui/separator";
import VisitDialogOverlay from "@/components/visit-dialog-overlay";

function resolveVisitById(visits, id) {
  if (!id) return null;
  const normalized = String(id);
  return visits.find((visit) => String(visit.id) === normalized) || null;
}

function getVisitParam() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("visit");
}

function setVisitParam(visitId) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (visitId) {
    url.searchParams.set("visit", String(visitId));
    window.history.pushState({ visitId }, "", url);
  } else {
    url.searchParams.delete("visit");
    window.history.replaceState({}, "", url);
  }
}

export default function ArtistVisitsClient({ visitsCount, liveVisits, upcomingVisits, pastVisits, artistSlug }) {
  const allVisits = useMemo(() => [...liveVisits, ...upcomingVisits, ...pastVisits], [liveVisits, upcomingVisits, pastVisits]);
  const [activeVisit, setActiveVisit] = useState(null);

  const openVisit = (visit) => {
    if (!visit) return;
    setActiveVisit(visit);
    setVisitParam(visit.id);
  };

  const closeVisit = () => {
    setActiveVisit(null);
    setVisitParam(null);
  };

  useEffect(() => {
    if (!allVisits.length) return;
    const current = resolveVisitById(allVisits, getVisitParam());
    if (current) {
      setActiveVisit(current);
    }
  }, [allVisits]);

  useEffect(() => {
    const handlePopState = () => {
      const current = resolveVisitById(allVisits, getVisitParam());
      setActiveVisit(current);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allVisits]);

  return (
    <div className="artist-visits-root relative w-full max-w-5xl px-6 pb-20 mx-auto sm:px-6 sm:pt-4 lg:px-8">
      <div className="relative z-10 space-y-6">
        {visitsCount === 0 ? (
          <div className="text-sm border border-dashed rounded-2xl border-slate-200 bg-white/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="space-y-24">
            {liveVisits.length > 0 ? (
              <section className="group space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-4">
                  <div className="grid gap-8 sm:gap-6">
                    {liveVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} artistSlug={artistSlug} onOpen={openVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
            {upcomingVisits.length > 0 ? (
              <section className="mt-20 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Upcoming</h2>
                  <div className="grid gap-8 sm:gap-6">
                    {upcomingVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} artistSlug={artistSlug} onOpen={openVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
            {upcomingVisits.length > 0 && pastVisits.length > 0 ? (
              <div className="w-full max-w-4xl mx-auto py-10 md:py-20">
                <Separator className="" />
              </div>
            ) : null}
            {pastVisits.length > 0 ? (
              <section className="mt-8 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  <div className="grid gap-8 sm:gap-6">
                    {pastVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} artistSlug={artistSlug} onOpen={openVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
      <VisitDialogOverlay visit={activeVisit} open={Boolean(activeVisit)} onOpenChange={(nextOpen) => (nextOpen ? null : closeVisit())} />
    </div>
  );
}
