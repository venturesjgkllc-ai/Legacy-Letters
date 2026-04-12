import { EventType } from "@/types";

// ─── MOCK TRANSCRIPTION ──────────────────────────────────────────────────────
export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  // MOCK: Replace with real OpenAI Whisper call when API key is ready
  console.log("[MOCK] Transcribing audio:", audioBlob.size, "bytes");
  await new Promise((r) => setTimeout(r, 2000)); // simulate API delay

  return `I remember the day you were born like it was yesterday. The whole world seemed to stop for a moment, and I just held you in my arms and thought, "I can't believe this is real." You were so small, and I was so terrified — terrified of getting it wrong, of not being enough. But you looked up at me with those big eyes and somehow, just somehow, I knew we were going to figure it out together. You've always had that gift — the ability to make the people around you feel like everything is going to be okay. I've watched you grow from that tiny miracle into someone who moves through the world with so much grace and kindness. There's a moment I think about often — you must have been about seven years old — and you stopped to help a little bird that had fallen from a nest. You were so careful, so gentle, and so determined. That's exactly who you are. That's the person I've been honored to know and love your whole life. I want you to carry that forward. I want you to always know that the best parts of who you are — the kindness, the courage, the way you love — those don't come from me. Those came from you.`;
}

// ─── MOCK LETTER REWRITE ─────────────────────────────────────────────────────
export async function rewriteLetter(
  transcript: string,
  recipientName: string,
  senderName: string,
  eventType: EventType,
  prompt: string
): Promise<{ letter: string; year: string }> {
  // MOCK: Replace with real GPT-4o call when API key is ready
  console.log("[MOCK] Rewriting letter for:", recipientName, eventType);
  await new Promise((r) => setTimeout(r, 3000));

  const eventOpening: Record<EventType, string> = {
    birthday: `On this special birthday`,
    wedding: `On the eve of your wedding`,
    anniversary: `As another year of your love story unfolds`,
    graduation: `As you step into this magnificent new chapter`,
  };

  const year = String(new Date().getFullYear() - Math.floor(Math.random() * 30 + 5));

  const letter = `Dear ${recipientName},

${eventOpening[eventType]}, I find myself reaching back through the years to find the words that have always lived in my heart but rarely made it to my lips.

I remember the day you were born as though the world itself paused to take notice. I held you — so small, so impossibly perfect — and I whispered a quiet promise to myself: that I would love you well, that I would try to be worthy of you. I have spent every day since then working to keep that promise.

You were such a child full of wonder. I remember watching you discover the world with those wide, searching eyes — nothing was too small to deserve your attention, nothing too ordinary to escape your curiosity. There was an afternoon, you must have been about seven, when you stopped everything to gently help a small bird that had fallen to the ground. You were so careful, so patient, so utterly certain that the bird deserved your full care. I stood back and watched you, and I thought: this child knows something the rest of us have to work our whole lives to learn.

That is the person you have always been. The one who notices. The one who shows up. The one who loves without needing to be asked.

I want you to know — truly know — that watching you become yourself has been the great privilege of my life. Not the milestones, not the achievements, though those have filled me with more pride than I have words for. It is the everyday you. The way you laugh. The way you carry your name. The way you make the people around you feel that they matter.

As you move into this next season of your life, I want to leave you with the one thing I know for certain after all these years: the love you give away always comes back to you. Be generous with it. Be brave with it. Do not save it for the easy days.

I am so proud of you. I am so grateful you are mine.

All my love, always,
${senderName}`;

  return { letter, year };
}

// ─── MOCK PDF URL ─────────────────────────────────────────────────────────────
export async function generatePdfUrl(letterId: string): Promise<string> {
  // MOCK: Returns placeholder — real impl generates PDF and uploads to Supabase Storage
  return `/api/letters/${letterId}/pdf`;
}
