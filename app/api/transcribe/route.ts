import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // STUB: When OPENAI_API_KEY is set, replace this with real Whisper call:
    // const formData = await req.formData();
    // const audio = formData.get("audio") as File;
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const transcription = await openai.audio.transcriptions.create({
    //   file: audio,
    //   model: "whisper-1",
    // });
    // return NextResponse.json({ transcript: transcription.text });

    await new Promise((r) => setTimeout(r, 1500));
    return NextResponse.json({
      transcript: "Mock transcript: I remember the day you were born like it was yesterday...",
    });
  } catch (err) {
    console.error("[/api/transcribe]", err);
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
  }
}
