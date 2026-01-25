"use client";

import { useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

function normalizeTag(value) {
  return value.trim().replace(/\s+/g, " ");
}

export default function SpecialisationsInput({ defaultValue = "", name = "specialisation" }) {
  const inputRef = useRef(null);
  const initialTags = useMemo(() => {
    if (!defaultValue) return [];
    return defaultValue
      .split(",")
      .map((tag) => normalizeTag(tag))
      .filter(Boolean);
  }, [defaultValue]);

  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");

  const addTag = (raw) => {
    const next = normalizeTag(raw);
    if (!next) return;
    setTags((prev) => (prev.includes(next) ? prev : [...prev, next]));
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((item) => item !== tag));
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

  return (
    <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-md border border-input bg-white px-2 py-2 shadow-xs transition focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-slate-950/40" onClick={() => inputRef.current?.focus()}>
      {tags.map((tag) => (
        <Badge key={tag} className="gap-1 border border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200">
          {tag}
          <button type="button" aria-label={`Remove ${tag}`} className="rounded-full p-0.5 hover:bg-violet-100 dark:hover:bg-violet-500/20" onClick={() => removeTag(tag)}>
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Fine line, traditional, illustration..."
        className="h-7 w-[160px] border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
      />
      <input type="hidden" name={name} value={tags.join(", ")} />
    </div>
  );
}
