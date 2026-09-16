"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { LanguageOption } from "@/content/refocus";

type LanguageSelectorProps = {
  options: LanguageOption[];
  /** Language code of the page currently open, highlighted in both places. */
  activeLanguage: string;
};

function GlobeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="10"
        cy="10"
        rx="3.1"
        ry="7.25"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M3.1 7.75h13.8M3.1 12.25h13.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function LanguageSelector({
  options,
  activeLanguage,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const active =
    options.find((o) => o.code === activeLanguage) ?? options[0] ?? null;
  if (!active) return null;

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Language: ${active.name}`}
        className="flex items-center gap-2.25 px-3 py-2 rounded-lg border border-border-input bg-surface-white cursor-pointer text-ink"
      >
        <GlobeIcon />
        <span className="hidden lg:block w-px h-4 bg-[#E1E1E1]" />
        <span className="hidden lg:block text-sm font-medium leading-none tracking-[-0.28px] uppercase text-black">
          {active.code}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="var(--color-ink-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute right-0 top-full mt-2 p-3 bg-[#F0F0F0] rounded-xl border border-[#DCDCDC] shadow-lg z-50 w-52 lg:w-80 ${
          open ? "block" : "hidden"
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {options.map((option) => (
            <Link
              key={option.code}
              href={option.href}
              hrefLang={option.code}
              title={option.endonym || option.name}
              onClick={() => setOpen(false)}
              aria-current={option.code === active.code ? "page" : undefined}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer whitespace-nowrap transition-colors text-ink ${
                option.code === active.code
                  ? "border border-[#DFDFDF] bg-surface-white font-medium"
                  : "hover:bg-surface-white/60"
              }`}
            >
              <GlobeIcon />
              <span className="uppercase">{option.code}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
