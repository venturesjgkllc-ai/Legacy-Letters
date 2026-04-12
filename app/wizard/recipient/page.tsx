"use client";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";

export default function RecipientStep() {
  const router = useRouter();
  const { state, update } = useWizard();

  const isValid =
    state.recipientEmail.trim() &&
    state.recipientEmail.includes("@") &&
    state.recipientRelationship.trim();

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">💌</div>
        <h1 className="font-serif text-4xl text-ink mb-3">
          Who receives this letter?
        </h1>
        <p className="font-body text-sepia-500 text-lg">
          We'll deliver the letter to their inbox on the big day.
        </p>
      </div>

      <div className="card-warm p-8 space-y-6">
        <div>
          <label htmlFor="relationship" className="label-warm text-lg">
            Your relationship to {state.recipientName || "them"}
          </label>
          <input
            id="relationship"
            type="text"
            value={state.recipientRelationship}
            onChange={(e) => update({ recipientRelationship: e.target.value })}
            className="input-warm"
            placeholder='e.g. "my daughter", "my son", "my granddaughter"'
            maxLength={60}
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="recipientEmail" className="label-warm text-lg">
            {state.recipientName ? `${state.recipientName}'s` : "Their"} email address
          </label>
          <input
            id="recipientEmail"
            type="email"
            autoComplete="off"
            value={state.recipientEmail}
            onChange={(e) => update({ recipientEmail: e.target.value })}
            className="input-warm"
            placeholder="their@email.com"
            aria-required="true"
            aria-describedby="email-note"
          />
          <p id="email-note" className="font-sans text-sm text-sepia-400 mt-2">
            This is where the letter will be delivered. Keep it a surprise!
          </p>
        </div>

        {/* Mailing address — optional, unlocks physical */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="label-warm text-lg mb-0">
              Mailing address <span className="font-sans text-sm font-400 text-sepia-400">(optional)</span>
            </label>
            <span className="bg-gold/10 text-gold-dark font-sans text-xs font-500 px-3 py-1 rounded-full border border-gold/20">
              Unlocks physical delivery
            </span>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={state.mailingAddress?.line1 ?? ""}
              onChange={(e) =>
                update({ mailingAddress: { ...(state.mailingAddress ?? { city: "", state: "", zip: "", country: "US" }), line1: e.target.value } })
              }
              className="input-warm"
              placeholder="Street address (US only)"
              autoComplete="shipping address-line1"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                value={state.mailingAddress?.city ?? ""}
                onChange={(e) =>
                  update({ mailingAddress: { ...(state.mailingAddress ?? { line1: "", state: "", zip: "", country: "US" }), city: e.target.value } })
                }
                className="input-warm col-span-1"
                placeholder="City"
                autoComplete="shipping address-level2"
              />
              <input
                type="text"
                value={state.mailingAddress?.state ?? ""}
                onChange={(e) =>
                  update({ mailingAddress: { ...(state.mailingAddress ?? { line1: "", city: "", zip: "", country: "US" }), state: e.target.value } })
                }
                className="input-warm col-span-1"
                placeholder="State"
                autoComplete="shipping address-level1"
                maxLength={2}
              />
              <input
                type="text"
                value={state.mailingAddress?.zip ?? ""}
                onChange={(e) =>
                  update({ mailingAddress: { ...(state.mailingAddress ?? { line1: "", city: "", state: "", country: "US" }), zip: e.target.value } })
                }
                className="input-warm col-span-1"
                placeholder="ZIP"
                autoComplete="shipping postal-code"
                maxLength={10}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => router.back()}
          className="btn-secondary flex-1 text-lg"
        >
          ← Back
        </button>
        <button
          onClick={() => router.push("/wizard/sender")}
          disabled={!isValid}
          className="btn-primary flex-2 text-lg"
          style={{ flex: 2 }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
