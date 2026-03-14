"use client";

import { useMemo, useRef, useState } from "react";
import { PlusCircle, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function normalizeHandle(value) {
  const cleaned = value.trim().replace(/^@/, "").replace(/\s+/g, "");
  return cleaned ? `@${cleaned}` : "";
}

export default function LinkedAccountsInput({
  defaultValue = "",
  name = "linked_accounts",
  description = "Link others that are related to this visit, e.g. collegues or friends that are joining you in the visit.",
  error = false,
  onFieldChange,
  inputId,
}) {
  const inputRef = useRef(null);
  const initialTags = useMemo(() => {
    if (!defaultValue) return [];
    const values = Array.isArray(defaultValue) ? defaultValue : defaultValue.split(",");
    return values.map((tag) => normalizeHandle(tag)).filter(Boolean);
  }, [defaultValue]);

  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");

  const addTag = (raw) => {
    const next = normalizeHandle(raw);
    if (!next) return;
    setTags((prev) => {
      const updated = prev.includes(next) ? prev : [...prev, next];
      return updated;
    });
    onFieldChange?.(name);
  };

  const removeTag = (tag) => {
    setTags((prev) => {
      const updated = prev.filter((item) => item !== tag);
      return updated;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      addTag(inputValue);
      setInputValue("");
      return;
    }

    if ((event.key === "Backspace" || event.key === "Delete") && !inputValue) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (!inputValue) return;
    addTag(inputValue);
    setInputValue("");
  };

  const handleAddClick = () => {
    addTag(inputValue);
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
      <div
        className={`flex flex-wrap items-center gap-2 rounded-xl border px-3 py-2 shadow-none transition-[color,box-shadow] focus-within:ring-[3px] ${
          error
            ? "border-red-400 bg-rose-50/40 dark:bg-rose-500/10 dark:border-red-400 focus-within:ring-red-300/40"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-input/30 focus-within:ring-ring/50"
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <Badge key={tag} className="gap-1 border border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-400/40 dark:bg-purple-500/20 dark:text-purple-200">
            {tag}
            <button type="button" aria-label={`Remove ${tag}`} className="rounded-full p-0.5 hover:bg-purple-200/70 dark:hover:bg-purple-500/30" onClick={() => removeTag(tag)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          ref={inputRef}
          id={inputId}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="@ Add another account..."
          className="h-7 w-[180px] border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
          aria-invalid={error}
        />
        <Button type="button" size="sm" className="ml-auto w-auto rounded-full px-4" onClick={handleAddClick} disabled={!inputValue.trim()}>
          <PlusCircle className="h-4 w-4" />
          Add Account
        </Button>
      </div>
      <input type="hidden" name={name} value={tags.join(", ")} />
      {description ? <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}
