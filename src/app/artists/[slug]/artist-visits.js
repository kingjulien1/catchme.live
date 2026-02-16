import ArtistVisitsClient from "./artist-visits-client";

function coerceVisitDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" && value.includes(" ") && !value.includes("T")) {
    const normalized = value.replace(" ", "T");
    const normalizedDate = new Date(normalized);
    if (!Number.isNaN(normalizedDate.getTime())) return normalizedDate;
  }
  const asDate = new Date(value);
  if (!Number.isNaN(asDate.getTime())) return asDate;
  const asNumber = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(asNumber)) return null;
  const numericMs = asNumber < 10_000_000_000 ? asNumber * 1000 : asNumber;
  const numericDate = new Date(numericMs);
  return Number.isNaN(numericDate.getTime()) ? null : numericDate;
}

function sortByStartAsc(a, b) {
  const aStart = coerceVisitDate(a.visit_start_time ?? a.start_time ?? a.start_date ?? a.start);
  const bStart = coerceVisitDate(b.visit_start_time ?? b.start_time ?? b.start_date ?? b.start);
  if (!aStart && !bStart) return 0;
  if (!aStart) return 1;
  if (!bStart) return -1;
  return aStart.getTime() - bStart.getTime();
}

function sortLiveVisits(a, b) {
  const aEnd = coerceVisitDate(a.visit_end_time ?? a.end_time ?? a.end_date ?? a.end);
  const bEnd = coerceVisitDate(b.visit_end_time ?? b.end_time ?? b.end_date ?? b.end);
  const aHasEnd = Boolean(aEnd);
  const bHasEnd = Boolean(bEnd);
  if (aHasEnd !== bHasEnd) return aHasEnd ? -1 : 1;
  if (aHasEnd && bHasEnd) return aEnd.getTime() - bEnd.getTime();
  return sortByStartAsc(a, b);
}

function sortByEndDesc(a, b) {
  const aEnd = coerceVisitDate(a.visit_end_time ?? a.end_time ?? a.end_date ?? a.end) || coerceVisitDate(a.visit_start_time ?? a.start_time ?? a.start_date ?? a.start);
  const bEnd = coerceVisitDate(b.visit_end_time ?? b.end_time ?? b.end_date ?? b.end) || coerceVisitDate(b.visit_start_time ?? b.start_time ?? b.start_date ?? b.start);
  if (!aEnd && !bEnd) return 0;
  if (!aEnd) return 1;
  if (!bEnd) return -1;
  return bEnd.getTime() - aEnd.getTime();
}

function isVisible(visit) {
  if (!visit || visit.status == null) return true;
  const status = String(visit.status).toLowerCase();
  return status !== "archived";
}

export default function ArtistVisits({ visits = [], artistSlug }) {
  const now = new Date();

  const filteredVisits = Array.isArray(visits) ? visits.filter((visit) => isVisible(visit)) : [];

  const liveVisits = [];
  const upcomingVisits = [];
  const pastVisits = [];

  filteredVisits.forEach((visit) => {
    const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
    const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);

    if (start && start <= now && (!end || end >= now)) {
      liveVisits.push(visit);
      return;
    }

    if (end && end < now) {
      pastVisits.push(visit);
      return;
    }

    upcomingVisits.push(visit);
  });

  liveVisits.sort(sortLiveVisits);
  upcomingVisits.sort(sortByStartAsc);
  pastVisits.sort(sortByEndDesc);

  return <ArtistVisitsClient visitsCount={filteredVisits.length} liveVisits={liveVisits} upcomingVisits={upcomingVisits} pastVisits={pastVisits} artistSlug={artistSlug} />;
}
