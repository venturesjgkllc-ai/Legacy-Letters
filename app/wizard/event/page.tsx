"use client";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { EventType } from "@/types";
import { cn } from "@/lib/utils";

const EVENTS: { type: EventType; icon: string; label: string; desc: string }[] = [
  { type: "birthday",    icon: "🎂", label: "Birthday",    desc: "Celebrate a life well lived" },
  { type: "wedding",     icon: "💍", label: "Wedding",     desc: "A new chapter begins" },
  { type: "anniversary", icon: "❤️", label: "Anniversary", desc: "Years of love honored" },
  { type: "graduation",  icon: "🎓", label: "Graduation",  desc: "The future starts now" },
];

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

function getMinPhysicalDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
}

export default function EventStep() {
  const router = useRouter();
  const { state, update } = useWizard();

  const today = getTodayString();
  const minPhysicalDate = getMinPhysicalDate();
  const hasMailingAddress = !!(state.mailingAddress?.line1 && state.mailingAddress?.city);

  // Date validation
  const selectedDate = state.eventDate;
  const dateIsValid = selectedDate >= today;
  const physicalDateValid = !hasMailingAddress || selectedDate >= minPhysicalDate;

  const isValid = state.eventType && state.eventDate && state.recipientName.trim() && dateIsValid && physicalDateValid;

  const eventLabel = EVENTS.find((e) => e.type === state.eventType)?.label.toLowerCase() ?? "event";

  return (
    <div className="animate-fade-in-up">
      {/* Skip link target */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-ink mb-3">What's the occasion?</h1>
        <p className="font-body text-sepia-500 text-lg">
          Choose the moment this letter is meant to celebrate.
        </p>
      </div>

      {/* Event type selection */}
      <fieldset className="mb-8">
        <legend className="sr-only">Select event type</legend>
        <div className="grid grid-cols-2 gap-4">
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
              aria-label={`${event.label}: ${event.desc}`}
              type="button"
            >
              <span className="text-4xl block mb-3" role="img" aria-hidden="true">{event.icon}</span>
              <div className="font-serif text-xl text-ink mb-1">{event.label}</div>
              <div className="font-sans text-sm text-sepia-400">{event.desc}</div>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Recipient name */}
      <div className="mb-6">
        <label htmlFor="recipientName" className="label-warm text-lg">
          Who is this letter for? <span aria-hidden="true">*</span>
        </label>
        <input
          id="recipientName"
          type="text"
          value={state.recipientName}
          onChange={(e) => update({ recipientName: e.target.value })}
          className="input-warm"
          placeholder='e.g. "Emily" or "my daughter Emily"'
          maxLength={80}
          aria-required="true"
        />
      </div>

      {/* Event date */}
      <div className="mb-8">
        <label htmlFor="eventDate" className="label-warm text-lg">
          When is {state.eventType ? eventLabel : "the event"}? <span aria-hidden="true">*</span>
        </label>
        <input
          id="eventDate"
          type="date"
          value={state.eventDate}
          onChange={(e) => update({ eventDate: e.target.value })}
          min={today}
          className="input-warm"
          aria-required="true"
          aria-describedby="date-hint"
        />
        <div id="date-hint" className="mt-2 space-y-1">
          {selectedDate && dateIsValid && !hasMailingAddress && (
            <p className="font-sans text-sm text-sepia-400">
              Your letter will be delivered on this date.
            </p>
          )}
          {selectedDate && !dateIsValid && (
            <p className="font-sans text-sm text-red-600" role="alert" aria-live="polite">
              Please select today's date or a future date.
            </p>
          )}
          {selectedDate && dateIsValid && hasMailingAddress && !physicalDateValid && (
            <p className="font-sans text-sm text-amber-600" role="alert" aria-live="polite">
              Physical mail requires at least 7 days lead time. Please choose a date on or after {minPhysicalDate}.
            </p>
          )}
          {selectedDate && dateIsValid && hasMailingAddress && physicalDateValid && (
            <p className="font-sans text-sm text-sepia-400">
              Your letter will be delivered digitally and by physical mail on this date.
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => router.push("/wizard/recipient")}
        disabled={!isValid}
        className="btn-primary w-full text-xl"
        aria-disabled={!isValid}
      >
        Continue →
      </button>

      {!isValid && (
        <p className="text-center font-sans text-sm text-sepia-400 mt-4" role="status" aria-live="polite">
          {!state.eventType
            ? "Please choose an event type."
            : !state.recipientName.trim()
            ? "Please enter the recipient's name."
            : !state.eventDate
            ? "Please choose a date."
            : !dateIsValid
            ? "Please choose today or a future date."
            : "Please choose a date at least 7 days away for physical mail."}
        </p>
      )}
    </div>
  );
}
