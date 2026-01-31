"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";
import { Loader2, MapPinPlus } from "lucide-react";

const initialState = { errors: {}, message: "", values: null };

export default function VisitForm({ action }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [localErrors, setLocalErrors] = useState(state.errors);
  const [localMessage, setLocalMessage] = useState(state.message);
  const [optionValues, setOptionValues] = useState(state.values);
  const [previewValues, setPreviewValues] = useState({});
  const formRef = useRef(null);
  const hasErrors = Boolean(localMessage) || (localErrors && Object.keys(localErrors).length > 0);

  useEffect(() => {
    setLocalErrors(state.errors || {});
    setLocalMessage(state.message || "");
    setOptionValues(state.values || null);
  }, [state.errors, state.message, state.values]);

  useEffect(() => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    setPreviewValues(Object.fromEntries(formData.entries()));
  }, []);

  const handlePreviewUpdate = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    setPreviewValues(Object.fromEntries(formData.entries()));
  };

  const clearError = (field) => {
    setLocalMessage("");
    setLocalErrors((prev) => {
      if (!prev || !prev[field]) return prev || {};
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <form ref={formRef} className="w-full max-w-5xl mx-auto py-16" action={formAction} onInput={handlePreviewUpdate}>
      <div className="mb-8">
        <h1 id="visit-start" className="text-3xl font-semibold tracking-tight text-gray-900 scroll-mt-20 dark:text-slate-100 sm:scroll-mt-24 sm:text-4xl">
          Create a Visit
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Share your upcoming travel plans and connect with clients in new locations.</p>
        {localMessage ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{localMessage}</p> : null}
      </div>
      <VisitDetailsSection errors={localErrors} onFieldChange={clearError} />
      <VisitOptionsSection initialValues={optionValues} onOptionChange={handlePreviewUpdate} />
      <VisitPreviewSection values={previewValues} />
      <div className="flex mt-10">
        <div className="w-full lg:w-1/2 lg:ml-auto">
          <Button
            className="flex items-center justify-center w-full gap-2 px-6 py-6 text-base font-semibold text-white bg-black shadow-sm rounded-2xl transition hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 disabled:opacity-70 disabled:hover:translate-y-0 dark:bg-fuchsia-500/50 dark:hover:bg-fuchsia-500/70 dark:hover:shadow-fuchsia-500/30 dark:focus-visible:ring-fuchsia-300/40"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <MapPinPlus className="w-5 h-5" />
                Save & Continue
              </>
            )}
          </Button>
          {hasErrors ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{localMessage || "Please fix the highlighted fields."}</p> : null}
        </div>
      </div>
    </form>
  );
}
