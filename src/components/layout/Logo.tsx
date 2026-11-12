import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-full" aria-label={`${siteConfig.name} home`}>
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" className="h-7 w-7">
          <circle cx="18" cy="26" r="11" fill="#1a1030" />
          <circle cx="14" cy="22" r="1.7" fill="#f6f3ff" />
          <circle cx="19" cy="19.5" r="1.7" fill="#f6f3ff" />
          <circle cx="15.5" cy="26.5" r="1.7" fill="#f6f3ff" />
          <path
            d="M34 8c3.2 0 5.5 3.6 5.5 7.2 0 2.4-.9 4.4-2.1 6 2.1 1.1 3.6 3.3 3.6 6.4 0 4.8-3.2 8.8-7 8.8s-7-4-7-8.8c0-3.1 1.5-5.3 3.6-6.4-1.2-1.6-2.1-3.6-2.1-6C28.5 11.6 30.8 8 34 8z"
            fill="#f8f5ef"
          />
          <rect x="31.2" y="18.2" width="5.6" height="1.5" rx="0.7" fill="#fb7185" />
        </svg>
      </span>
      <span className="text-left">
        <span className="font-display block text-[0.95rem] leading-none font-bold tracking-tight sm:text-base">
          {siteConfig.shortName}
        </span>
        {compact ? null : (
          <span className="mt-1 block text-[9px] font-bold tracking-[0.16em] text-muted uppercase sm:text-[10px]">
            {siteConfig.area}
          </span>
        )}
      </span>
    </Link>
  );
}
