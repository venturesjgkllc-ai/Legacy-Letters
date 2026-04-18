import { NextRequest, NextResponse } from "next/server";
import { EventType } from "@/types";

const EVENT_OPENINGS: Record<EventType, string> = {
  birthday:    "On this special birthday",
  wedding:     "On the eve of your wedding day",
  anniversary: "As another year of your love story unfolds",
  graduation:  "As you step into this magnificent new chapter",
};

function buildSystemPrompt(
  recipientName: string,
  senderName: string,
  eventType: EventType,
  prompt: string
): string {
  return `You are a warm, skilled letter writer helping families preserve heartfelt memories.

Your task: Transform a voice recording transcript into a beautiful, heartfelt personal letter.

LETTER REQUIREMENTS:
- Written in first person from ${senderName} to ${recipientName}
- Occasion: ${eventType} — open with "${EVENT_OPENINGS[eventType]}"
- Tone: reflective, loving, story-driven — like speaking directly to a beloved family member
- Length: approximately 500 words (medium, story-rich)
- Style: warm, literary, emotional — not formal or stiff
- Use specific details, memories, and feelings from the transcript
- Do NOT make up details that aren't in the transcript
- Write naturally as if the person is speaking from the heart
- Start with "Dear ${recipientName},"
- End with "With all my love, always," on its own line, followed by "${senderName}" on the next line
- The recording prompt was: "${prompt}"

IMPORTANT: The letter must reflect what was actually said in the recording. Use the speaker's actual memories, stories, and feelings. Do not substitute generic content.

After the letter, on a completely new line, write exactly: YEAR: followed by the most likely year being referenced in the letter (e.g. YEAR: 1987). If no specific year is clear, estimate based on context.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, recipientName, senderName, eventType, prompt } = body as {
      transcript: string;
      recipientName: string;
      senderName: string;
      eventType: EventType;
      prompt: string;
    };

    if (!transcript || !recipientName || !senderName || !eventType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // ── MOCK: no real key configured ─────────────────────────
    if (!apiKey || apiKey.includes("your-openai-key")) {
      await new Promise((r) => setTimeout(r, 3000));
      const mockLetter = `Dear ${recipientName},

${EVENT_OPENINGS[eventType]}, I find myself reaching back through the years to find the words that have always lived in my heart but rarely made it to my lips.

${transcript.slice(0, 300)}...

I want you to know — truly know — that watching you become yourself has been the great privilege of my life. Not the milestones, not the achievements, though those have filled me with more pride than I have words for. It is the everyday you. The way you laugh. The way you carry your name. The way you make the people around you feel that they matter.

As you move into this next season of your life, I want to leave you with the one thing I know for certain after all these years: the love you give away always comes back to you. Be generous with it. Be brave with it. Do not save it for the easy days.

I am so proud of you. I am so grateful you are mine.

With all my love, always,
${senderName}

YEAR: ${new Date().getFullYear() - 25}`;

      const lines = mockLetter.split("\n");
      const yearLine = lines.find((l) => l.startsWith("YEAR:"));
      const year = yearLine?.replace("YEAR:", "").trim() ?? "";
      const letter = lines.filter((l) => !l.startsWith("YEAR:")).join("\n").trim();
      return NextResponse.json({ letter, year });
    }

    // ── REAL: GPT-4o ──────────────────────────────────────────
    const gptRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 1200,
        temperature: 0.85,
        messages: [
          {
            role: "system",
            content: buildSystemPrompt(recipientName, senderName, eventType, prompt),
          },
          {
            role: "user",
            content: `Here is the voice recording transcript:\n\n"${transcript}"\n\nPlease write the heartfelt letter now.`,
          },
        ],
      }),
    });

    if (!gptRes.ok) {
      const errText = await gptRes.text();
      console.error("[/api/rewrite] GPT-4o error:", errText);
      return NextResponse.json({ error: "Letter generation failed" }, { status: 500 });
    }

    const gptData = await gptRes.json();
    const fullText: string = gptData.choices?.[0]?.message?.content ?? "";

    // Extract year from the YEAR: line at the end
    const lines = fullText.split("\n");
    const yearLine = lines.find((l) => l.trim().startsWith("YEAR:"));
    const year = yearLine?.replace("YEAR:", "").trim() ?? "";
    const letter = lines
      .filter((l) => !l.trim().startsWith("YEAR:"))
      .join("\n")
      .trim();

    return NextResponse.json({ letter, year });
  } catch (err) {
    console.error("[/api/rewrite]", err);
    return NextResponse.json({ error: "Letter generation failed" }, { status: 500 });
  }
}
