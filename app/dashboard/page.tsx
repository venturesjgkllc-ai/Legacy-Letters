"use client";
import Link from "next/link";
import { useState } from "react";
import { Letter, EventType } from "@/types";
import { formatDate, getDaysUntil, getEventEmoji, cn } from "@/lib/utils";

// Mock letters for UI demonstration
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
    transcript: "I remember the day you were born...",
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
    transcript: "I want to tell you about the moment I knew...",
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
  const labels = {
    draft: "Draft",
    scheduled: "Scheduled",
    sent: "Delivered",
    failed: "Failed",
  };
  return (
    <span className={cn("font-sans text-xs font-500 px-3 py-1 rounded-full", styles[status])}>
      {labels[status]}
    </span>
  );
}

function LetterCard({ letter }: { letter: Letter }) {
  const daysUntil = getDaysUntil(letter.eventDate);
  const isPast = daysUntil < 0;
  const emoji = getEventEmoji(letter.eventType as EventType);

  return (
    <div className="card-warm p-6 flex items-start gap-5">
      <div className="text-3xl shrink-0">{emoji}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
          <div>
            <h3 className="font-serif text-xl text-ink">
              To {letter.recipientName}
            </h3>
            <p className="font-sans text-sm text-sepia-400">
              {letter.eventType.charAt(0).toUpperCase() + letter.eventType.slice(1)} ·{" "}
              {formatDate(letter.eventDate)}
              {!isPast && daysUntil <= 30 && (
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

        <div className="flex gap-3 mt-4 flex-wrap">
          {letter.pdfUrl && (
            <a
              href={letter.pdfUrl}
              className="btn-secondary text-sm px-5 py-2.5"
              aria-label={`Download PDF letter for ${letter.recipientName}`}
            >
              ⬇ Download PDF
            </a>
          )}
          {letter.status === "draft" && (
            <Link
              href="/wizard/event"
              className="btn-secondary text-sm px-5 py-2.5"
            >
              ✏️ Continue editing
            </Link>
          )}
          {letter.status === "draft" && (
            <button className="btn-primary text-sm px-5 py-2.5">
              📅 Schedule delivery
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [letters] = useState<Letter[]>(MOCK_LETTERS);

  const scheduled = letters.filter((l) => l.status === "scheduled");
  const drafts = letters.filter((l) => l.status === "draft");
  const delivered = letters.filter((l) => l.status === "sent");

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-cream border-b border-sepia-100">
        <div className="max-w-4xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-burgundy font-bold">
            Legacy Letters
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="font-sans text-sm text-sepia-500 hover:text-burgundy">
              Sign out
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl text-ink mb-2">Your legacy letters</h1>
          <p className="font-body text-sepia-500 text-lg">
            Each letter is a piece of your heart, delivered at exactly the right moment.
          </p>
        </div>

        {/* Upgrade banner */}
        <div className="bg-gradient-to-r from-burgundy/5 to-gold/5 border border-gold/30 rounded-3xl p-7 mb-10 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <div className="font-script text-2xl text-gold-dark mb-1">Free trial active</div>
            <p className="font-body text-sepia-600 text-base">
              You have 1 free letter. Upgrade to schedule delivery and create more.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button className="btn-gold text-base px-6 py-3">
              Upgrade — from $29
            </button>
          </div>
        </div>

        {/* Start new */}
        <div className="mb-8">
          <Link
            href="/wizard/event"
            className="btn-primary inline-flex items-center gap-3 text-xl px-8 py-5"
          >
            <span>+</span> Record a new letter
          </Link>
        </div>

        {/* Letter sections */}
        {scheduled.length > 0 && (
          <section className="mb-10" aria-label="Scheduled letters">
            <h2 className="font-serif text-2xl text-ink mb-4">Scheduled for delivery</h2>
            <div className="space-y-4">
              {scheduled.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {drafts.length > 0 && (
          <section className="mb-10" aria-label="Draft letters">
            <h2 className="font-serif text-2xl text-ink mb-4">Drafts</h2>
            <div className="space-y-4">
              {drafts.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {delivered.length > 0 && (
          <section className="mb-10" aria-label="Delivered letters">
            <h2 className="font-serif text-2xl text-ink mb-4">Delivered</h2>
            <div className="space-y-4">
              {delivered.map((l) => <LetterCard key={l.id} letter={l} />)}
            </div>
          </section>
        )}

        {letters.length === 0 && (
          <div className="text-center py-20 card-warm">
            <div className="text-5xl mb-4">✉️</div>
            <h2 className="font-serif text-2xl text-ink mb-3">No letters yet</h2>
            <p className="font-body text-sepia-500 text-lg mb-8">
              Your first letter is waiting to be written.
            </p>
            <Link href="/wizard/event" className="btn-primary">
              Record my first letter
            </Link>
          </div>
        )}

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-sepia-100 flex flex-wrap gap-6 font-sans text-sm text-sepia-400">
          <Link href="/privacy" className="hover:text-burgundy transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-burgundy transition-colors">Terms of Use</Link>
          <Link href="/privacy#do-not-sell" className="hover:text-burgundy transition-colors">
            Do Not Sell My Personal Information
          </Link>
        </div>
      </div>
    </div>
  );
}
