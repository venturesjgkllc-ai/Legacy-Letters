"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { getShuffledPrompts, insertRecipientName, Prompt } from "@/lib/prompts";
import { EventType } from "@/types";
import { cn } from "@/lib/utils";

export default function PromptsStep() {
  const router = useRouter();
  const { state, update } = useWizard();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [useCustom, setUseCustom] = useState(false);

  useEffect(() => {
    if (state.eventType) {
      setPrompts(getShuffledPrompts(state.eventType as EventType));
    }
  }, [state.eventType]);

  function shuffle() {
    if (state.eventType) {
      setPrompts(getShuffledPrompts(state.eventType as EventType));
      update({ selectedPrompt: "" });
    }
  }

  const activePrompt = useCustom ? state.customPrompt : state.selectedPrompt;
  const isValid = activePrompt.trim().length > 0;

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl text-ink mb-3">Pick a story to tell</h1>
        <p className="font-body text-sepia-500 text-lg max-w-xl mx-auto">
          These sparks will help you find the memory your family will treasure forever.
          Pick one to guide your recording — or write your own.
        </p>
      </div>

      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button
          onClick={shuffle}
          className="btn-secondary text-base px-6 py-3"
          aria-label="Shuffle prompts"
        >
          🔀 Shuffle prompts
        </button>
        <button
          onClick={() => { setUseCustom(!useCustom); if (!useCustom) update({ selectedPrompt: "" }); }}
          className={cn("btn-secondary text-base px-6 py-3", useCustom && "border-burgundy text-burgundy")}
        >
          ✏️ Write my own
        </button>
      </div>

      {useCustom ? (
        <div className="card-warm p-6 mb-6">
          <label htmlFor="customPrompt" className="label-warm text-lg">
            Your own prompt or topic
          </label>
          <textarea
            id="customPrompt"
            value={state.customPrompt}
            onChange={(e) => update({ customPrompt: e.target.value })}
            className="textarea-warm"
            placeholder="e.g. 'I want to talk about the summer we spent at the lake cabin, and what that time meant to me...'"
            rows={4}
            autoFocus
          />
          <p className="font-sans text-sm text-sepia-400 mt-2">
            This will appear on screen while you record — think of it as your guide.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 mb-6">
          {prompts.map((prompt) => {
            const text = insertRecipientName(prompt.text, state.recipientName);
            const isSelected = state.selectedPrompt === text;
            return (
              <button
                key={prompt.id}
                onClick={() => update({ selectedPrompt: text })}
                className={cn(
                  "text-left p-6 rounded-2xl border-2 transition-all duration-200",
                  isSelected
                    ? "bg-burgundy/5 border-burgundy shadow-warm"
                    : "bg-cream border-sepia-100 hover:border-sepia-300 hover:shadow-warm"
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all",
                      isSelected ? "border-burgundy bg-burgundy" : "border-sepia-300"
                    )}
                  >
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-sepia-700 text-base leading-relaxed">{text}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {activePrompt && (
        <div className="bg-burgundy/5 border border-burgundy/20 rounded-2xl p-5 mb-6">
          <p className="font-sans text-sm text-burgundy font-500 mb-2">Selected prompt:</p>
          <p className="font-body text-sepia-700 text-base italic leading-relaxed">"{activePrompt}"</p>
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={() => router.back()} className="btn-secondary flex-1 text-lg">
          ← Back
        </button>
        <button
          onClick={() => router.push("/wizard/record")}
          disabled={!isValid}
          className="btn-primary text-lg"
          style={{ flex: 2 }}
        >
          Continue to recording →
        </button>
      </div>
    </div>
  );
}
