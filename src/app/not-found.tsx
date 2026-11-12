import type { Metadata } from "next";
import Link from "next/link";
import { LaneTheatre } from "@/components/animations/LaneTheatre";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page is not on the Leisure City Bowling Club website.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page grid items-center gap-10 py-32 lg:grid-cols-2">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="page-title mt-3">That lane is empty</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The page is missing, or the link has changed. The lanes that are ready are still on the homepage.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/book-now" className="btn btn-secondary">
            Book a game
          </Link>
        </div>
      </div>
      <LaneTheatre />
    </div>
  );
}
