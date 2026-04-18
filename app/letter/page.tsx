"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Letter, EventType } from "@/types";
import { LetterHeader, LetterFooter } from "@/components/letter/LetterDecorations";
import { generateLetterPdf, downloadPdf } from "@/lib/pdf-generator";
import { formatDate } from "@/lib/utils";

// Mock letter for standalone preview (in real app, fetched from Supabase)
const MOCK_LETTER: Letter = {
  id: "preview",
  userId: "user_1",
  recipientName: "Emily",
  recipientEmail: "emily@example.com",
  senderName: "Dad",
  eventType: "birthday",
  eventDate: "2025-06-14",
  letterText: `Dear Emily,

On this special birthday, I find myself reaching back through the years to find the words that have always lived in my heart but rarely made it to my lips.

I remember the day you were born as though the world itself paused to take notice. I held you — so small, so impossibly perfect — and I whispered a quiet promise to myself: that I would love you well, that I would try to be worthy of you. I have spent every day since then working to keep that promise.

You were such a child full of wonder. I remember watching you discover the world with those wide, searching eyes — nothing was too small to deserve your attention, nothing too ordinary to escape your curiosity. There was an afternoon, you must have been about seven, when you stopped everything to gently help a small bird that had fallen to the ground. You were so careful, so patient, so utterly certain that the bird deserved your full care. I stood back and watched you, and I thought: this child knows something the rest of us have to work our whole lives to learn.

That is the person you have always been. The one who notices. The one who shows up. The one who loves without needing to be asked.

I want you to know — truly know — that watching you become yourself has been the great privilege of my life. Not the milestones, not the achievements, though those have filled me with more pride than I have words for. It is the everyday you. The way you laugh. The way you carry your name. The way you make the people around you feel that they matter.

As you move into this next season of your life, I want to leave you with the one thing I know for certain after all these years: the love you give away always comes back to you. Be generous with it. Be brave with it. Do not save it for the easy days.

I am so proud of you. I am so grateful you are mine.`,
  transcript: "",
  year: "1995",
  status: "draft",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function LetterPreviewPage() {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // In real app, fetch letter by ID from Supabase
  const letter = MOCK_LETTER;

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await generateLetterPdf({
        recipientName: letter.recipientName,
        senderName: letter.senderName,
        eventType: letter.eventType as EventType,
        eventDate: letter.eventDate,
        letterText: letter.letterText,
        year: letter.year,
      });
      downloadPdf(blob, `legacy-letter-${letter.recipientName.toLowerCase()}.pdf`);
      setDownloaded(true);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("PDF download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  const eventTitles: Record<string, string> = {
    birthday: "Happy Birthday",
    wedding: "With Love on Your Wedding Day",
    anniversary: "Happy Anniversary",
    graduation: "Congratulations, Graduate!",
  };

  return (
    <div className="min-h-screen bg-sepia-50">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-cream border-b border-sepia-100 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-sans text-sm text-sepia-500 hover:text-burgundy">
          ← Back to dashboard
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-primary text-base px-6 py-3"
            aria-busy={downloading}
          >
            {downloading
              ? "Preparing PDF…"
              : downloaded
              ? "✓ Downloaded!"
              : "⬇ Download PDF"}
          </button>
        </div>
      </div>

      {/* Letter preview */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div
          className="parchment-paper rounded-2xl overflow-hidden shadow-warm-lg"
          aria-label="Letter preview"
        >
          {/* Illustrated header */}
          <LetterHeader
            eventType={letter.eventType as EventType}
            recipientName={letter.recipientName}
            className="w-full"
          />

          {/* Letter body */}
          <div className="px-10 py-8">
            {/* Salutation */}
            <p className="font-body text-ink text-xl font-500 mb-6 italic">
              Dear {letter.recipientName},
            </p>

            {/* Body paragraphs */}
            <div className="font-body text-sepia-800 text-base leading-relaxed space-y-5">
              {letter.letterText
                .replace(/^Dear [^,]+,\s*/i, "")
                .split(/\n\n+/)
                .map((p, i) => (
                  <p key={i} className="italic">
                    {p.trim()}
                  </p>
                ))}
            </div>

            {/* Closing */}
            <div className="mt-10">
              <p className="font-body text-sepia-700 italic text-base">
                With all my love, always,
              </p>
              <p className="font-script text-3xl text-burgundy mt-2">
                {letter.senderName}
              </p>
            </div>

            {/* Delivery info */}
            <div className="mt-8 pt-6 border-t border-sepia-200 text-center">
              <p className="font-sans text-xs text-sepia-400">
                Delivered to {letter.recipientName} · {formatDate(letter.eventDate)}
              </p>
            </div>
          </div>

          {/* Illustrated footer */}
          <LetterFooter
            senderName={letter.senderName}
            className="w-full"
          />
        </div>

        {/* Upgrade prompt if not scheduled */}
        {letter.status === "draft" && (
          <div className="mt-8 card-warm border border-gold/30 p-7 text-center">
            <div className="font-script text-2xl text-gold-dark mb-2">
              Schedule delivery for the big day
            </div>
            <p className="font-body text-sepia-600 text-base mb-5">
              Your letter is saved. Upgrade to have it delivered automatically
              to {letter.recipientName}'s inbox on {formatDate(letter.eventDate)}.
            </p>
            <Link href="/dashboard?upgrade=true" className="btn-gold inline-block px-8 py-4">
              Upgrade — from $29
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
