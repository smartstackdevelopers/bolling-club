import type Lenis from "lenis";
import { registerGsap, ScrollTrigger } from "@/components/experience/registerGsap";

let lenis: Lenis | null = null;
let refreshTimer = 0;
let lockCount = 0;
type LenisListener = (instance: Lenis | null) => void | (() => void);
const listeners = new Set<LenisListener>();

export function getLenis() {
  return lenis;
}

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  if (instance && lockCount > 0) instance.stop();
  listeners.forEach((listener) => listener(instance));
}

export function subscribeLenis(listener: LenisListener) {
  let teardown: void | (() => void);
  const wrapped: LenisListener = (instance) => {
    teardown?.();
    teardown = listener(instance);
  };
  listeners.add(wrapped);
  wrapped(lenis);
  return () => {
    listeners.delete(wrapped);
    teardown?.();
  };
}

export function getHeaderOffset() {
  if (typeof window === "undefined") return 72;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (header) return Math.round(header.getBoundingClientRect().height);
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-offset").trim();
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return 72;
  return raw.endsWith("rem") ? parsed * 16 : parsed;
}

export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    registerGsap();
    lenis?.resize();
    ScrollTrigger.refresh();
  }, 180);
}

export function scrollToTarget(
  target: number | string | HTMLElement,
  options: { immediate?: boolean; offset?: number } = {},
) {
  const isTop = target === 0 || target === "#main" || target === "top";
  const offset = options.offset ?? (isTop ? 0 : -(getHeaderOffset() + 12));

  if (lenis) {
    lenis.scrollTo(isTop ? 0 : target, { immediate: options.immediate, offset, force: true });
    return;
  }

  const behavior: ScrollBehavior = options.immediate ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }

  if (typeof target === "string") {
    if (isTop) {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const id = target.startsWith("#") ? target.slice(1) : target;
    const node = document.getElementById(id);
    if (!node) return;
    window.scrollTo({ top: node.getBoundingClientRect().top + window.scrollY + offset, behavior });
    return;
  }

  window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior });
}

export function scrollToHash(hash: string, immediate = false) {
  if (!hash || hash === "#") return;
  if (hash === "#main") {
    scrollToTarget(0, { immediate, offset: 0 });
    return;
  }
  const id = decodeURIComponent(hash.replace("#", ""));
  const node = document.getElementById(id);
  if (node) scrollToTarget(node, { immediate });
}

export function lockPageScroll() {
  lockCount += 1;
  if (lockCount !== 1) return;
  lenis?.stop();
  document.documentElement.classList.add("scroll-locked");
}

export function unlockPageScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount !== 0) return;
  lenis?.start();
  document.documentElement.classList.remove("scroll-locked");
}
