"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { registerGsap, gsap, ScrollTrigger } from "@/components/experience/registerGsap";
import {
  scheduleScrollRefresh,
  scrollToHash,
  scrollToTarget,
  setLenis,
} from "@/lib/smooth-scroll";

function NavigationScroll() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const first = useRef(true);
  const popped = useRef(false);
  const memory = useRef(new Map<string, number>());

  useEffect(() => {
    function onPop() {
      popped.current = true;
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const from = previous.current;
    previous.current = pathname;

    if (first.current) {
      first.current = false;
      if (window.location.hash) {
        requestAnimationFrame(() => scrollToHash(window.location.hash, true));
      }
      scheduleScrollRefresh();
      return;
    }

    memory.current.set(from, window.scrollY);
    const restore = popped.current;
    popped.current = false;
    const hash = window.location.hash;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (restore) {
          scrollToTarget(memory.current.get(pathname) ?? 0, { immediate: true, offset: 0 });
        } else if (hash) {
          scrollToHash(hash, true);
        } else {
          scrollToTarget(0, { immediate: true, offset: 0 });
        }
        scheduleScrollRefresh();
      });
    });
  }, [pathname]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      document.documentElement.classList.remove("has-lenis");
      document.documentElement.dataset.scrollBehavior = "auto";
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 0.9,
      anchors: false,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      gestureOrientation: "vertical",
    });

    setLenis(lenis);
    document.documentElement.classList.add("has-lenis");
    document.documentElement.dataset.scrollBehavior = "auto";
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    let lastWidth = window.innerWidth;
    const onResize = () => {
      const width = window.innerWidth;
      const mobile = window.matchMedia("(pointer: coarse)").matches;
      if (mobile && width === lastWidth) return;
      lastWidth = width;
      scheduleScrollRefresh();
    };

    const main = document.getElementById("main");
    const observer = main ? new ResizeObserver(() => scheduleScrollRefresh()) : null;
    if (main && observer) observer.observe(main);

    function onAnchorClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || link.hasAttribute("download") || link.target === "_blank") return;
      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.search !== window.location.search) return;
      event.preventDefault();
      scrollToHash(url.hash || "#main");
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", scheduleScrollRefresh);
    window.addEventListener("load", scheduleScrollRefresh);
    document.addEventListener("click", onAnchorClick);
    void document.fonts?.ready.then(scheduleScrollRefresh);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", scheduleScrollRefresh);
      window.removeEventListener("load", scheduleScrollRefresh);
      document.removeEventListener("click", onAnchorClick);
      observer?.disconnect();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenis(null);
      document.documentElement.classList.remove("has-lenis");
    };
  }, []);

  return (
    <>
      <NavigationScroll />
      {children}
    </>
  );
}
