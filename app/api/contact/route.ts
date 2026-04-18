import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey.includes("your-resend-key")) {
      // Mock in dev
      console.log("[MOCK contact form]", { name, email, message });
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Legacy Letters <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
      to: "hello@legacyletters.com",
      reply_to: email,
      subject: `Contact form message from ${name}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#FDF6E3;">
          <h2 style="font-family:Georgia,serif;color:#8B4513;margin-bottom:8px;">New contact form message</h2>
          <hr style="border:none;border-top:1px solid #E8D5BA;margin-bottom:24px;"/>
          <p style="font-size:16px;color:#2C1810;margin-bottom:8px;"><strong>Name:</strong> ${name}</p>
          <p style="font-size:16px;color:#2C1810;margin-bottom:8px;"><strong>Email:</strong> ${email}</p>
          <p style="font-size:16px;color:#2C1810;margin-bottom:16px;"><strong>Message:</strong></p>
          <div style="background:#FDF8F3;border:1px solid #E8D5BA;border-radius:8px;padding:16px;font-size:16px;color:#6B4226;line-height:1.7;white-space:pre-wrap;">${message}</div>
          <hr style="border:none;border-top:1px solid #E8D5BA;margin-top:32px;margin-bottom:16px;"/>
          <p style="font-size:12px;color:#A67C52;text-align:center;">Sent from Legacy Letters contact form</p>
        </div>
      `,
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
