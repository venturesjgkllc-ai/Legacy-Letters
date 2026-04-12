import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { transcript, recipientName, senderName, eventType } = body;

    // STUB: When OPENAI_API_KEY is set, replace with real GPT-4o call:
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [{ role: "user", content: buildPrompt(transcript, recipientName, senderName, eventType) }],
    //   max_tokens: 1000,
    // });
    // return NextResponse.json({ letter: completion.choices[0].message.content, year: "1990" });

    await new Promise((r) => setTimeout(r, 2000));
    return NextResponse.json({
      letter: `Dear ${recipientName},\n\nOn this special day, I find myself reaching back through the years...\n\nWith all my love,\n${senderName}`,
      year: String(new Date().getFullYear() - 25),
    });
  } catch (err) {
    console.error("[/api/rewrite]", err);
    return NextResponse.json({ error: "Letter generation failed" }, { status: 500 });
  }
}
