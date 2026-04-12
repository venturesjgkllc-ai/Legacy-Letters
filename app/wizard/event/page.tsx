"use client";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { EventType } from "@/types";
import { cn } from "@/lib/utils";

const EVENTS: { type: EventType; icon: string; label: string; desc: string }[] = [
  { type: "birthday", icon: "🎂", label: "Birthday", desc: "Celebrate a life well lived" },
  { type: "wedding", icon: "💍", label: "Wedding", desc: "A new chapter begins" },
  { type: "anniversary", icon: "❤️", label: "Anniversary", desc: "Years of love honored" },
  { type: "graduation", icon: "🎓", label: "Graduation", desc: "The future starts now" },
];

export default function EventStep() {
  const router = useRouter();
  const { state, update } = useWizard();

  function handleNext() {
    if (state.eventType && state.eventDate && state.recipientName) {
      router.push("/wizard/recipient");
    }
  }

  const isValid = state.eventType && state.eventDate && state.recipientName.trim();

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-ink mb-3">What's the occasion?</h1>
        <p className="font-body text-sepia-500 text-lg">
          Choose the moment this letter is meant to celebrate.
        </p>
      </div>

      {/* Event type selection */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {EVENTS.map((event) => (
          <button
            key={event.type}
            onClick={() => update({ eventType: event.type })}
            className={cn(
              "card-warm p-6 text-left transition-all duration-200 border-2",
              state.eventType === event.type
                ? "border-burgundy bg-burgundy/5 shadow-warm"
                : "border-transparent hover:border-sepia-200 hover:shadow-warm"
            )}
            aria-pressed={state.eventType === event.type}
          >
            <span className="text-4xl block mb-3" role="img" aria-label={event.label}>
              {event.icon}
            </span>
            <div className="font-serif text-xl text-ink mb-1">{event.label}</div>
            <div className="font-sans text-sm text-sepia-400">{event.desc}</div>
          </button>
        ))}
      </div>

      {/* Recipient name */}
      <div className="mb-6">
        <label htmlFor="recipientName" className="label-warm text-lg">
          Who is this letter for?
        </label>
        <input
          id="recipientName"
          type="text"
          value={state.recipientName}
          onChange={(e) => update({ recipientName: e.target.value })}
          className="input-warm"
          placeholder="e.g. Emily, my daughter"
          maxLength={80}
          aria-required="true"
        />
      </div>

      {/* Event date */}
      <div className="mb-8">
        <label htmlFor="eventDate" className="label-warm text-lg">
          When is{" "}
          {state.eventType
            ? EVENTS.find((e) => e.type === state.eventType)?.label.toLowerCase()
            : "the event"}
          ?
        </label>
        <input
          id="eventDate"
          type="date"
          value={state.eventDate}
          onChange={(e) => update({ eventDate: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
          className="input-warm"
          aria-required="true"
        />
        {state.eventDate && (
          <p className="font-sans text-sm text-sepia-400 mt-2">
            Your letter will be delivered on this date.
          </p>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!isValid}
        className="btn-primary w-full text-xl"
      >
        Continue →
      </button>

      {!isValid && (
        <p className="text-center font-sans text-sm text-sepia-400 mt-4">
          Please choose an event, enter a name, and pick a date.
        </p>
      )}
    </div>
  );
}
