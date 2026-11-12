"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-page py-32">
      <p className="eyebrow">Something paused</p>
      <h1 className="page-title mt-3">This page did not finish loading</h1>
      <p className="mt-4 max-w-xl text-muted">
        Try it once more, or go back to the homepage. If you were sending an enquiry, it has not been delivered.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </div>
    </div>
  );
}
