import { EventType } from "@/types";

// ── TRANSCRIPTION via API route ───────────────────────────────
// Audio is sent to /api/transcribe which calls OpenAI Whisper server-side
// (API keys must never be exposed to the browser)
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // just a check env is loaded

  // Build form data with the audio file
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");

  const res = await fetch("/api/transcribe", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Transcription failed");
  }

  const data = await res.json();
  return data.transcript as string;
}

// ── LETTER REWRITE via API route ──────────────────────────────
// Transcript is sent to /api/rewrite which calls GPT-4o server-side
export async function rewriteLetter(
  transcript: string,
  recipientName: string,
  senderName: string,
  eventType: EventType,
  prompt: string
): Promise<{ letter: string; year: string }> {
  const res = await fetch("/api/rewrite", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, recipientName, senderName, eventType, prompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error ?? "Letter generation failed");
  }

  const data = await res.json();
  return { letter: data.letter as string, year: data.year as string };
}
