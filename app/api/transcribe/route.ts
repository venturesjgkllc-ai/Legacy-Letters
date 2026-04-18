import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    // ── MOCK: no real key configured ─────────────────────────
    if (!apiKey || apiKey.includes("your-openai-key")) {
      await new Promise((r) => setTimeout(r, 2000));
      return NextResponse.json({
        transcript: "I remember the day you were born like it was yesterday. The whole world seemed to stop for a moment, and I just held you in my arms and thought, I can't believe this is real. You were so small, and I was so terrified — terrified of getting it wrong, of not being enough. But you looked up at me with those big eyes and somehow, just somehow, I knew we were going to figure it out together. You've always had that gift — the ability to make the people around you feel like everything is going to be okay. I've watched you grow from that tiny miracle into someone who moves through the world with so much grace and kindness. I want you to carry that forward. I want you to always know that the best parts of who you are — the kindness, the courage, the way you love — those are yours. I am so proud of you. I am so grateful you are mine.",
      });
    }

    // ── REAL: OpenAI Whisper ──────────────────────────────────
    const formData = await req.formData();
    const audio = formData.get("audio") as File | null;

    if (!audio) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Convert to File with correct name for Whisper
    const audioFile = new File([audio], "recording.webm", { type: audio.type || "audio/webm" });

    const whisperForm = new FormData();
    whisperForm.append("file", audioFile);
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "en");
    whisperForm.append("response_format", "text");

    const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: whisperForm,
    });

    if (!whisperRes.ok) {
      const errText = await whisperRes.text();
      console.error("[/api/transcribe] Whisper error:", errText);
      return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }

    // Whisper returns plain text when response_format is "text"
    const transcript = await whisperRes.text();

    return NextResponse.json({ transcript: transcript.trim() });
  } catch (err) {
    console.error("[/api/transcribe]", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
