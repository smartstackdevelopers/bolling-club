import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import Script from "next/script";
import { BackToTop } from "@/components/experience/BackToTop";
import { BloomOrbs } from "@/components/experience/BloomOrbs";
import { CursorGlow } from "@/components/experience/CursorGlow";
import { ScrollProgress } from "@/components/experience/ScrollProgress";
import { SmoothScroll } from "@/components/experience/SmoothScroll";
import { WebGLBackdrop } from "@/components/experience/WebGLBackdrop";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { SetupBanner } from "@/components/layout/SetupBanner";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteConfig.publicUrl ? new URL(siteConfig.publicUrl) : undefined,
  title: {
    default: "Leisure City Bowling Club | Kids & Family Bowling in Jinnah Park",
    template: "%s · Leisure City Bowling Club",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "entertainment",
  keywords: [
    "Leisure City Bowling Club",
    "bowling Jinnah Park",
    "bowling Rawalpindi",
    "kids bowling Rawalpindi",
    "family bowling Rawalpindi",
    "birthday party bowling Rawalpindi",
  ],
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#07091a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable} h-full antialiased`} data-scroll-behavior="auto">
      <body className="flex min-h-full flex-col font-sans">
        <Script id="bc-boot" strategy="beforeInteractive">
          {`(function(){try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var seen=sessionStorage.getItem("bc-loaded")==="1";if(seen||reduce){var style=document.createElement("style");style.textContent=".loader{display:none!important}";document.head.appendChild(style);}else{sessionStorage.setItem("bc-loaded","1");}}catch(e){}})();`}
        </Script>
        <noscript>
          <style>{`.motion-safe-hidden{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SmoothScroll>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <BloomOrbs />
          <WebGLBackdrop />
          <ScrollProgress />
          <LoadingScreen />
          <SetupBanner />
          <Navbar />
          <main id="main" className="relative z-[1] min-w-0 flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
          <BackToTop />
          <CursorGlow />
          <CustomCursor />
          <JsonLd />
        </SmoothScroll>
      </body>
    </html>
  );
}
