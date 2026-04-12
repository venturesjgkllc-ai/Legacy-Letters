"use client";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";

export default function SenderStep() {
  const router = useRouter();
  const { state, update } = useWizard();

  const isValid = state.senderName.trim();

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">✍️</div>
        <h1 className="font-serif text-4xl text-ink mb-3">And who are you?</h1>
        <p className="font-body text-sepia-500 text-lg">
          This is how the letter will be signed — in your own name.
        </p>
      </div>

      <div className="card-warm p-8 space-y-6">
        <div>
          <label htmlFor="senderName" className="label-warm text-lg">
            Your name
          </label>
          <input
            id="senderName"
            type="text"
            autoComplete="name"
            value={state.senderName}
            onChange={(e) => update({ senderName: e.target.value })}
            className="input-warm"
            placeholder='e.g. "Dad", "Grandpa Robert", "Mom"'
            maxLength={80}
            aria-required="true"
            aria-describedby="name-hint"
          />
          <p id="name-hint" className="font-sans text-sm text-sepia-400 mt-2">
            This appears at the bottom of the letter: "With love, [your name]"
          </p>
        </div>

        <div>
          <label htmlFor="fromNote" className="label-warm text-lg">
            A short note from you{" "}
            <span className="font-sans text-sm font-400 text-sepia-400">(optional)</span>
          </label>
          <textarea
            id="fromNote"
            value={state.fromNote}
            onChange={(e) => update({ fromNote: e.target.value })}
            className="textarea-warm"
            placeholder="e.g. 'This letter has been in my heart for years. I hope it finds you at exactly the right moment.'"
            maxLength={300}
            rows={4}
          />
          <p className="font-sans text-xs text-sepia-400 mt-1 text-right">
            {state.fromNote.length}/300
          </p>
        </div>

        {/* Preview of letter closing */}
        {state.senderName && (
          <div className="bg-sepia-50 rounded-xl p-5 border border-sepia-100">
            <p className="font-sans text-xs text-sepia-400 uppercase tracking-wider mb-3">Letter preview — closing</p>
            <p className="font-body text-sepia-600 italic text-base">
              With all my love, always,
            </p>
            <p className="font-script text-2xl text-burgundy mt-1">{state.senderName}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => router.back()} className="btn-secondary flex-1 text-lg">
          ← Back
        </button>
        <button
          onClick={() => router.push("/wizard/prompts")}
          disabled={!isValid}
          className="btn-primary text-lg"
          style={{ flex: 2 }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
