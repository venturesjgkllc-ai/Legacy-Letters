"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Letter, EventType } from "@/types";
import { formatDate, getDaysUntil, getEventEmoji, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase-client";

const MOCK_LETTERS: Letter[] = [
  {
    id: "letter_1",
    userId: "user_1",
    recipientName: "Emily",
    recipientEmail: "emily@example.com",
    senderName: "Dad",
    eventType: "birthday",
    eventDate: "2025-06-14",
    letterText: "Dear Emily, on this special birthday...",
    transcript: "",
    year: "1995",
    status: "scheduled",
    pdfUrl: "/api/letters/letter_1/pdf",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "letter_2",
    userId: "user_1",
    recipientName: "James",
    recipientEmail: "james@example.com",
    senderName: "Grandpa",
    eventType: "graduation",
    eventDate: "2025-05-20",
    letterText: "Dear James, as you step into this magnificent chapter...",
    transcript: "",
    year: "2000",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function StatusBadge({ status }: { status: Letter["status"] }) {
  const styles = {
    draft: "bg-sepia-100 text-sepia-600",
    scheduled: "bg-gold/10 text-gold-dark",
    sent: "bg-green-50 text-green-700",
    failed: "bg-red-50 text-red-700",
  };
  const labels = { draft: "Draft", scheduled: "Scheduled", sent: "Delivered", failed: "Failed" };
  return (
    <span className={cn("font-sans text-xs font-500 px-3 py-1 rounded-full", styles[status])}>
      {labels[status]}
    </span>
  );
}

function LetterCard({ letter }: { letter: Letter }) {
  const daysUntil = getDaysUntil(letter.eventDate);
  const emoji = getEventEmoji(letter.eventType as EventType);

  return (
    <article className="card-warm p-6 flex items-start gap-5" aria-label={`Letter to ${letter.recipientName} for ${letter.eventType}`}>
      <span className="text-3xl shrink-0" role="img" aria-label={letter.eventType}>{emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
          <div>
            <h3 className="font-serif text-xl text-ink">To {letter.recipientName}</h3>
            <p className="font-sans text-sm text-sepia-400">
              {letter.eventType.charAt(0).toUpperCase() + letter.eventType.slice(1)} · {formatDate(letter.eventDate)}
              {daysUntil >= 0 && daysUntil <= 30 && (
                <span className="ml-2 text-burgundy font-500">
                  ({daysUntil === 0 ? "Today!" : `${daysUntil} days away`})
                </span>
              )}
            </p>
          </div>
          <StatusBadge status={letter.status} />
        </div>
        <p className="font-body text-sepia-500 text-sm leading-relaxed mt-2 line-clamp-2">
          {letter.letterText}
        </p>
        <div className="flex gap-3 mt-4 flex-wrap" role="group" aria-label={`Actions for letter to ${letter.recipientName}`}>
          {letter.pdfUrl && (
            <a href={letter.pdfUrl} className="btn-secondary text-sm px-5 py-2.5" aria-label={`Download PDF letter for ${letter.recipientName}`}>
              ⬇ Download PDF
            </a>
          )}
          {letter.status === "draft" && (
            <Link href="/wizard/event" className="btn-secondary text-sm px-5 py-2.5" aria-label={`Continue editing letter for ${letter.recipientName}`}>
              ✏️ Continue editing
            </Link>
          )}
          {letter.status === "draft" && (
            <button className="btn-primary text-sm px-5 py-2.5" aria-label={`Schedule delivery for letter to ${letter.recipientName}`}>
              📅 Schedule delivery
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [letters] = useState<Letter[]>(MOCK_LETTERS);
  const [signingOut, setSigningOut] = useState(false);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wizard_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.eventType) setHasSavedProgress(true);
      } catch {}
    }
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      sessionStorage.clear();
      router.push("/auth/login");
      router.refresh();
    } catch {
      setSigningOut(false);
    }
  }

  function clearSavedProgress() {
    localStorage.removeItem("wizard_progress");
    setHasSavedProgress(false);
  }

  const scheduled = letters.filter((l) => l.status === "scheduled");
  const drafts = letters.filter((l) => l.status === "draft");
  const delivered = letters.filter((l) => l.status === "sent");

  return (
    <div className="min-h-screen bg-parchment">
      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-burgundy text-cream px-4 py-2 rounded-lg z-50 font-sans text-sm">
        Skip to main content
      </a>

      <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-cream border-b border-sepia-100">
        <div className="max-w-4xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-burgundy font-bold" aria-label="Legacy Letters home">
            Legacy Letters
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="font-sans text-sm text-sepia-500 hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded px-2 py-1">
              Contact Us
            </Link>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="btn-secondary text-sm px-5 py-2.5"
              aria-busy={signingOut}
              aria-label="Sign out of your account"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content" className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-ink mb-2">Your legacy letters</h1>
          <p className="font-body text-sepia-500 text-lg">
            Each letter is a piece of your heart, delivered at exactly the right moment.
          </p>
        </div>

        {/* Resume saved wizard progress */}
        {hasSavedProgress && (
          <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mb-8 flex items-center justify-between gap-4 flex-wrap" role="status">
            <div>
              <p className="font-serif text-lg text-ink mb-1">You have an unfinished letter</p>
              <p className="font-sans text-sm text-sepia-500">Pick up right where you left off.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={clearSavedProgress} className="btn-secondary text-sm px-4 py-2.5" aria-label="Discard saved letter progress">
                Discard
              </button>
              <Link href="/wizard/event" className="btn-primary text-sm px-4 py-2.5" aria-label="Resume your unfinished letter">
                Resume letter →
              </Link>
            </div>
          </div>
        )}

        {/* Upgrade banner */}
        <div className="bg-gradient-to-r from-burgundy/5 to-gold/5 border border-gold/30 rounded-3xl p-7 mb-10 flex items-center justify-between gap-6 flex-wrap" role="complementary" aria-label="Upgrade offer">
          <div>
            <div className="font-script text-2xl text-gold-dark mb-1">Free trial active</div>
            <p className="font-body text-sepia-600 text-base">
              You have 1 free letter. Upgrade to schedule delivery and create more.
            </p>
          </div>
          <button className="btn-gold text-base px-6 py-3" aria-label="Upgrade your plan starting from $29">
            Upgrade — from $29
          </button>
        </div>

        {/* Start new letter */}
        <div className="mb-8">
          <Link
            href="/wizard/event"
            className="btn-primary inline-flex items-center gap-3 text-xl px-8 py-5"
            aria-label="Start recording a new legacy letter"
          >
            <span aria-hidden="true">+</span> Record a new letter
          </Link>
        </div>

        {/* Letter sections */}
        {scheduled.length > 0 && (
          <section className="mb-10" aria-labelledby="scheduled-heading">
            <h2 id="scheduled-heading" className="font-serif text-2xl text-ink mb-4">Scheduled for delivery</h2>
            <div className="space-y-4">
              {scheduled.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {drafts.length > 0 && (
          <section className="mb-10" aria-labelledby="drafts-heading">
            <h2 id="drafts-heading" className="font-serif text-2xl text-ink mb-4">Drafts</h2>
            <div className="space-y-4">
              {drafts.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {delivered.length > 0 && (
          <section className="mb-10" aria-labelledby="delivered-heading">
            <h2 id="delivered-heading" className="font-serif text-2xl text-ink mb-4">Delivered</h2>
            <div className="space-y-4">
              {delivered.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {letters.length === 0 && (
          <div className="text-center py-20 card-warm" role="status">
            <div className="text-5xl mb-4" role="img" aria-label="Empty mailbox">✉️</div>
            <h2 className="font-serif text-2xl text-ink mb-3">No letters yet</h2>
            <p className="font-body text-sepia-500 text-lg mb-8">Your first letter is waiting to be written.</p>
            <Link href="/wizard/event" className="btn-primary">Record my first letter</Link>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-sepia-100">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 font-sans text-sm text-sepia-400">
            <Link href="/privacy" className="hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded">Terms of Use</Link>
            <Link href="/contact" className="hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded">Contact Us</Link>
            <Link href="/privacy#do-not-sell" className="hover:text-burgundy transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy/30 rounded">Do Not Sell My Personal Information</Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}
