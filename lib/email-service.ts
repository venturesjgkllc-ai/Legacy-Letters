import { EventType } from "@/types";

interface SendLetterEmailParams {
  to: string;
  recipientName: string;
  senderName: string;
  eventType: EventType;
  letterText: string;
  pdfUrl?: string;
}

const EVENT_SUBJECTS: Record<EventType, string> = {
  birthday:    "A special letter for your birthday",
  wedding:     "A letter for your wedding day",
  anniversary: "A letter to celebrate your anniversary",
  graduation:  "A letter for your graduation",
};

const EVENT_EMOJIS: Record<EventType, string> = {
  birthday: "🎂",
  wedding: "💍",
  anniversary: "❤️",
  graduation: "🎓",
};

function buildEmailHtml(params: SendLetterEmailParams): string {
  const { recipientName, senderName, eventType, letterText } = params;
  const emoji = EVENT_EMOJIS[eventType];
  const paragraphs = letterText
    .replace(/^Dear [^,]+,\s*/i, "")
    .split(/\n\n+/)
    .filter(Boolean)
    .map(p => `<p style="margin:0 0 18px 0;font-style:italic;">${p.trim()}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${EVENT_SUBJECTS[eventType]}</title>
</head>
<body style="margin:0;padding:0;background:#F9F5F0;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center;padding:24px;background:#FDF6E3;border-radius:16px 16px 0 0;border:1px solid #E8D5BA;border-bottom:none;">
      <div style="font-size:48px;margin-bottom:8px;">${emoji}</div>
      <div style="font-size:22px;color:#8B4513;font-style:italic;font-family:Georgia,serif;">
        ${EVENT_SUBJECTS[eventType]}
      </div>
      <div style="width:60px;height:2px;background:#D4A017;margin:16px auto 0;"></div>
    </div>

    <!-- Letter body -->
    <div style="background:#FDF6E3;padding:32px 40px;border:1px solid #E8D5BA;border-top:none;border-bottom:none;">
      <p style="font-size:18px;color:#2C1810;margin:0 0 20px 0;font-style:italic;">
        Dear ${recipientName},
      </p>
      <div style="font-size:16px;color:#5A3A2A;line-height:1.8;">
        ${paragraphs}
      </div>
      <div style="margin-top:32px;">
        <p style="font-size:16px;color:#2C1810;font-style:italic;margin:0 0 8px 0;">
          With all my love, always,
        </p>
        <p style="font-size:22px;color:#8B4513;font-family:Georgia,serif;font-style:italic;margin:0;">
          ${senderName}
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#F9F5F0;padding:20px;text-align:center;border:1px solid #E8D5BA;border-top:none;border-radius:0 0 16px 16px;">
      <p style="font-size:11px;color:#A67C52;margin:0;font-style:italic;">
        This letter was created with Legacy Letters · legacyletters.com
      </p>
      ${params.pdfUrl ? `
      <a href="${params.pdfUrl}"
         style="display:inline-block;margin-top:12px;padding:10px 24px;background:#8B4513;color:#FDF8F3;text-decoration:none;border-radius:8px;font-size:14px;font-family:sans-serif;">
        Download beautiful PDF version
      </a>` : ""}
    </div>

  </div>
</body>
</html>`;
}

// ── SEND EMAIL (real Resend call) ─────────────────────────────
export async function sendLetterEmail(params: SendLetterEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "letters@legacyletters.com";

  if (!apiKey || apiKey.includes("your-resend-key")) {
    // STUB: log and return success in dev
    console.log("[MOCK sendLetterEmail] Would send to:", params.to);
    console.log("[MOCK sendLetterEmail] Subject:", EVENT_SUBJECTS[params.eventType]);
    return true;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Legacy Letters <${fromEmail}>`,
      to: params.to,
      subject: `${EVENT_EMOJIS[params.eventType]} ${EVENT_SUBJECTS[params.eventType]}`,
      html: buildEmailHtml(params),
    });

    if (error) {
      console.error("[sendLetterEmail] Resend error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[sendLetterEmail] exception:", err);
    return false;
  }
}

// ── LOB POSTCARD TRIGGER ──────────────────────────────────────
interface LobPostcardParams {
  recipientName: string;
  mailingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  senderName: string;
  eventType: EventType;
  letterPreview: string; // First 200 chars for postcard back
}

export async function triggerLobPostcard(params: LobPostcardParams): Promise<string | null> {
  const apiKey = process.env.LOB_API_KEY;

  if (!apiKey || apiKey.includes("your-lob-key")) {
    console.log("[MOCK triggerLobPostcard] Would mail to:", params.recipientName);
    return "mock_lob_postcard_id";
  }

  try {
    // Real Lob integration — uncomment when LOB_API_KEY is set:
    // const Lob = require('@lob/lob-typescript-sdk');
    // const lobClient = new Lob.PostcardsApi({ username: apiKey });
    //
    // const postcard = await lobClient.create({
    //   to: {
    //     name: params.recipientName,
    //     address_line1: params.mailingAddress.line1,
    //     address_line2: params.mailingAddress.line2,
    //     address_city: params.mailingAddress.city,
    //     address_state: params.mailingAddress.state,
    //     address_zip: params.mailingAddress.zip,
    //     address_country: 'US',
    //   },
    //   from: { name: 'Legacy Letters', ...senderAddress },
    //   front: '<html>...</html>', // Postcard front design
    //   back: `<html>${params.letterPreview}...</html>`,
    //   size: '4x6',
    // });
    //
    // return postcard.id;

    console.log("[LOB] Would create postcard for:", params.recipientName);
    return null;
  } catch (err) {
    console.error("[triggerLobPostcard]", err);
    return null;
  }
}
