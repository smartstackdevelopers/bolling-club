"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isNavActive, mainNav } from "@/config/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";
import { lockPageScroll, unlockPageScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const reduced = useReducedMotion();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const leaveTimer = useRef<number>(0);
  const open = openedAt === pathname;

  function closeMenus() {
    setOpenedAt(null);
    setExperienceOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [open]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenedAt(null);
      setExperienceOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header data-site-header className={cn("fixed inset-x-0 top-0 z-50", scrolled || open ? "nav-glass" : "bg-transparent")}>
      <div className="container-page flex h-16 items-center justify-between gap-2 md:h-[4.5rem] md:gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => {
                  window.clearTimeout(leaveTimer.current);
                  setExperienceOpen(true);
                }}
                onMouseLeave={() => {
                  window.clearTimeout(leaveTimer.current);
                  leaveTimer.current = window.setTimeout(() => setExperienceOpen(false), 120);
                }}
              >
                <button
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-sm font-semibold",
                    isNavActive(item.href, pathname) ? "text-gold" : "text-ink/90",
                  )}
                  aria-expanded={experienceOpen}
                  aria-controls="experience-menu"
                  onClick={() => {
                    window.clearTimeout(leaveTimer.current);
                    setExperienceOpen(true);
                  }}
                >
                  {item.label}
                  <ChevronDown className={cn("h-4 w-4 transition", experienceOpen && "rotate-180")} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {experienceOpen ? (
                    <motion.div
                      id="experience-menu"
                      role="region"
                      aria-label="Experience"
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-20 w-80 pt-3"
                    >
                      <div className="glass-card grid gap-1 p-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-2xl px-3 py-3 hover:bg-white/5"
                            aria-current={pathname === child.href ? "page" : undefined}
                            onClick={closeMenus}
                          >
                            <span className="block font-semibold">{child.label}</span>
                            <span className="mt-1 block text-sm text-muted">{child.description}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold",
                  isNavActive(item.href, pathname) ? "text-gold" : "text-ink/90",
                )}
                aria-current={isNavActive(item.href, pathname) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <WhatsAppAnchor className="btn btn-whatsapp" ariaLabel="Enquire on WhatsApp">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span className="hidden md:inline">WhatsApp</span>
            </WhatsAppAnchor>
          </div>
          <div className="hidden lg:block">
            <Link href="/book-now" className="btn btn-primary">
              Book Now
            </Link>
          </div>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenedAt(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            className="nav-glass max-h-[calc(100svh-5rem)] overflow-auto border-t border-white/10 lg:hidden"
          >
            <div className="container-page grid gap-1 py-4">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.href} className="grid">
                    <button
                      className="flex min-h-12 items-center justify-between text-left text-lg font-semibold"
                      aria-expanded={experienceOpen}
                      onClick={() => setExperienceOpen((value) => !value)}
                    >
                      {item.label}
                      <ChevronDown className={cn("h-5 w-5", experienceOpen && "rotate-180")} aria-hidden="true" />
                    </button>
                    {experienceOpen ? (
                      <div className="grid gap-1 pb-3 pl-3">
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href} className="min-h-11 py-2 text-muted" onClick={closeMenus}>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} className="flex min-h-12 items-center text-lg font-semibold" onClick={closeMenus}>
                    {item.label}
                  </Link>
                ),
              )}
              <Link href="/book-now" className="btn btn-primary mt-3 w-full">
                Book Now
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
