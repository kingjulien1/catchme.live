import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/db";
import { ArrowRight } from "lucide-react";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";

export default async function NewVisitPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/me");
  }

  async function createVisit(formData) {
    "use server";
    const payload = Object.fromEntries(formData.entries());
    console.log("CREATE VISIT", payload);
    return payload;
  }

  return (
    <form className="w-full mx-auto" action={createVisit}>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">Create a Visit</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Share your upcoming travel plans and connect with clients in new locations.</p>
      </div>
      <VisitDetailsSection />
      <VisitOptionsSection />
      <VisitPreviewSection />
      <div className="mt-10">
        <Button className="flex items-center justify-center w-full gap-2 px-6 py-6 text-base font-semibold text-white bg-black shadow-sm rounded-2xl transition hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 dark:bg-fuchsia-500/50 dark:hover:bg-fuchsia-500/70 dark:hover:shadow-fuchsia-500/30 dark:focus-visible:ring-fuchsia-300/40">
          Save & Continue
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
}
