"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { transcribeAudio, rewriteLetter } from "@/lib/ai-service";
import { generateLetterPdf, downloadPdf } from "@/lib/pdf-generator";
import { LetterHeader, LetterFooter } from "@/components/letter/LetterDecorations";
import { EventType } from "@/types";
import { cn } from "@/lib/utils";

type Stage = "transcribing" | "writing" | "ready" | "error";

export default function PreviewStep() {
  const router = useRouter();
  const { state, update } = useWizard();
  const [stage, setStage] = useState<Stage>("transcribing");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state.letterText) {
      setStage("ready");
      setEditText(state.letterText);
      return;
    }
    runAIMagic();
  }, []);

  async function runAIMagic() {
    try {
      setStage("transcribing");
      const blob = state.audioBlob ?? new Blob(["mock"], { type: "audio/webm" });
      const transcript = await transcribeAudio(blob);
      update({ transcript });
      setStage("writing");
      const { letter, year } = await rewriteLetter(
        transcript,
        state.recipientName,
        state.senderName,
        (state.eventType as EventType) ?? "birthday",
        state.selectedPrompt || state.customPrompt
      );
      update({ letterText: letter, year });
      setEditText(letter);
      setStage("ready");
    } catch {
      setStage("error");
    }
  }

  function saveEdit() {
    update({ letterText: editText });
    setEditing(false);
  }

  async function handleDownload() {
    setDownloading(true);
    try {
      const blob = await generateLetterPdf({
        recipientName: state.recipientName || "Friend",
        senderName: state.senderName || "With Love",
        eventType: (state.eventType as EventType) ?? "birthday",
        eventDate: state.eventDate,
        letterText: state.letterText,
        year: state.year,
        fromNote: state.fromNote,
      });
      downloadPdf(blob, `letter-for-${(state.recipientName || "you").toLowerCase().replace(/\s+/g, "-")}.pdf`);
      setSaved(true);
    } catch (err) {
      console.error("PDF failed:", err);
      alert("PDF generation failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  if (stage !== "ready" && stage !== "error") {
    return (
      <div className="animate-fade-in-up text-center py-20">
        <div className="text-6xl mb-6 animate-pulse">✨</div>
        <h1 className="font-serif text-4xl text-ink mb-4">
          {stage === "transcribing" ? "Listening to your story…" : "Crafting your letter with care…"}
        </h1>
        <p className="font-body text-sepia-500 text-lg mb-8">
          {stage === "transcribing"
            ? "We're carefully listening to every word you said."
            : "Shaping your memories into something beautiful."}
        </p>
        <div className="flex justify-center gap-2">
          {[0,1,2].map(i => (
            <div key={i} className="w-3 h-3 rounded-full bg-burgundy/40 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}/>
          ))}
        </div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">😔</div>
        <h1 className="font-serif text-3xl text-ink mb-3">Something went wrong</h1>
        <p className="font-body text-sepia-500 text-lg mb-8">We couldn't process your recording. Please try again.</p>
        <button onClick={runAIMagic} className="btn-primary">Try again</button>
      </div>
    );
  }

  const eventType = (state.eventType ?? "birthday") as EventType;
  const formattedDate = state.eventDate
    ? new Date(state.eventDate + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "the big day";

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">✨</div>
        <h1 className="font-serif text-4xl text-ink mb-3">Your letter is ready</h1>
        <p className="font-body text-sepia-500 text-lg">
          Read it over. Make any changes. Then save your free PDF.
        </p>
      </div>

      {/* Letter with illustrated header/footer */}
      <div className="parchment-paper rounded-3xl overflow-hidden mb-6 shadow-warm-lg">
        <LetterHeader eventType={eventType} recipientName={state.recipientName} className="w-full" />

        <div className="px-8 py-6">
          {editing ? (
            <div>
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="w-full font-body text-sepia-700 text-base leading-relaxed bg-white/80 border border-sepia-200 rounded-xl p-4 focus:outline-none focus:border-burgundy min-h-[400px]"
                aria-label="Edit letter text"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => { setEditing(false); setEditText(state.letterText); }} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={saveEdit} className="btn-primary" style={{ flex: 2 }}>
                  Save changes
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="font-body text-ink text-lg font-500 italic mb-5">
                Dear {state.recipientName},
              </p>
              <div className="font-body text-sepia-700 text-base leading-relaxed space-y-4">
                {state.letterText
                  .replace(/^Dear [^,]+,\s*/i, "")
                  .replace(/\nWith all my love[\s\S]*$/i, "")
                  .split(/\n\n+/)
                  .filter(Boolean)
                  .map((p, i) => <p key={i} className="italic">{p.trim()}</p>)}
              </div>
              <div className="mt-8">
                <p className="font-body text-sepia-700 italic">With all my love, always,</p>
                <p className="font-script text-3xl text-burgundy mt-1">{state.senderName}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-sepia-200 text-center">
                <p className="font-sans text-xs text-sepia-400">
                  Delivered to {state.recipientName} · {formattedDate}
                </p>
              </div>
            </>
          )}
        </div>

        <LetterFooter className="w-full" />
      </div>

      {/* Year + edit bar */}
      {!editing && (
        <div className="flex gap-4 items-center mb-6 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <label htmlFor="year-input" className="label-warm mb-0 text-sm whitespace-nowrap">
              Year in letter:
            </label>
            <input
              id="year-input"
              type="text"
              value={state.year}
              onChange={e => update({ year: e.target.value })}
              className="input-warm w-24 text-center py-2 text-base"
              maxLength={4}
              aria-label="Year referenced in the letter"
            />
          </div>
          <button onClick={() => setEditing(true)} className="btn-secondary text-base px-5 py-2.5">
            ✏️ Edit letter
          </button>
        </div>
      )}

      {/* Download + upgrade CTA */}
      {!editing && (
        <div className="card-warm border-2 border-gold/40 p-7 mb-6">
          <div className="text-center mb-5">
            <div className="font-script text-2xl text-gold-dark mb-1">Your letter is complete!</div>
            <p className="font-body text-sepia-600 text-base">
              Download your beautifully designed PDF — it's yours to keep, free forever.
              Upgrade to schedule automatic delivery on {formattedDate}.
            </p>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="btn-gold w-full text-xl py-5 mb-5"
            aria-busy={downloading}
            aria-label="Download letter as PDF"
          >
            {downloading ? "Preparing your PDF…" : saved ? "✓ PDF Downloaded — Download Again" : "⬇ Download My Free PDF Letter"}
          </button>

          {saved && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center" role="status">
              <p className="font-sans text-sm text-green-700">
                Your PDF has been saved to your downloads folder.
              </p>
            </div>
          )}

          <div className="border-t border-sepia-100 pt-5">
            <p className="font-sans text-sm text-center text-sepia-500 mb-4">
              Want it delivered automatically + create more letters?
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Keepsake", count: 3, price: 29 },
                { name: "Legacy",   count: 6, price: 59, popular: true },
                { name: "Heritage", count: 10, price: 89 },
              ].map(pkg => (
                <button
                  key={pkg.name}
                  onClick={() => router.push("/dashboard?upgrade=true")}
                  className={cn(
                    "rounded-xl border-2 p-3 text-center transition-all hover:shadow-warm",
                    pkg.popular ? "border-burgundy bg-burgundy/5" : "border-sepia-200 bg-cream"
                  )}
                  aria-label={`${pkg.name} package — ${pkg.count} letters for $${pkg.price}`}
                >
                  {pkg.popular && <div className="text-xs font-500 text-burgundy mb-1">Popular</div>}
                  <div className="font-serif text-base text-ink">{pkg.name}</div>
                  <div className="font-sans text-lg font-500 text-burgundy">${pkg.price}</div>
                  <div className="font-sans text-xs text-sepia-400">{pkg.count} letters</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!editing && (
        <button onClick={() => router.push("/dashboard")} className="btn-secondary w-full text-lg">
          Go to my dashboard
        </button>
      )}
    </div>
  );
}
