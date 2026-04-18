import { createClient } from "@/lib/supabase-client";
import { Letter, WizardState, EventType } from "@/types";

// ── SAVE LETTER ───────────────────────────────────────────────
export async function saveLetter(
  state: WizardState,
  userId: string
): Promise<{ id: string } | null> {
  const supabase = createClient();

  const letterData = {
    user_id: userId,
    recipient_name: state.recipientName,
    recipient_email: state.recipientEmail,
    recipient_relationship: state.recipientRelationship,
    sender_name: state.senderName,
    from_note: state.fromNote || null,
    event_type: state.eventType,
    event_date: state.eventDate,
    prompt_used: state.selectedPrompt || state.customPrompt,
    transcript: state.transcript || null,
    letter_text: state.letterText,
    year_referenced: state.year || null,
    status: "draft",
    mailing_line1: state.mailingAddress?.line1 || null,
    mailing_line2: state.mailingAddress?.line2 || null,
    mailing_city: state.mailingAddress?.city || null,
    mailing_state: state.mailingAddress?.state || null,
    mailing_zip: state.mailingAddress?.zip || null,
    mailing_country: state.mailingAddress?.country || "US",
  };

  try {
    const { data, error } = await supabase
      .from("letters")
      .insert(letterData)
      .select("id")
      .single();

    if (error) {
      console.error("[saveLetter]", error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error("[saveLetter] exception:", err);
    return null;
  }
}

// ── FETCH USER LETTERS ────────────────────────────────────────
export async function getUserLetters(userId: string): Promise<Letter[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[getUserLetters]", error.message);
      return [];
    }

    return (data ?? []).map(mapDbToLetter);
  } catch (err) {
    console.error("[getUserLetters] exception:", err);
    return [];
  }
}

// ── FETCH SINGLE LETTER ───────────────────────────────────────
export async function getLetter(id: string): Promise<Letter | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("letters")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return mapDbToLetter(data);
  } catch {
    return null;
  }
}

// ── UPDATE LETTER TEXT ────────────────────────────────────────
export async function updateLetterText(id: string, letterText: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("letters")
    .update({ letter_text: letterText })
    .eq("id", id);
  return !error;
}

// ── SAVE PDF STORAGE PATH ─────────────────────────────────────
export async function savePdfPath(id: string, pdfPath: string): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("letters")
    .update({ pdf_storage_path: pdfPath, status: "draft" })
    .eq("id", id);
  return !error;
}

// ── SCHEDULE LETTER ───────────────────────────────────────────
export async function scheduleLetter(id: string, sendAt: Date): Promise<boolean> {
  const supabase = createClient();
  const { error } = await supabase
    .from("letters")
    .update({ status: "scheduled", scheduled_send_at: sendAt.toISOString() })
    .eq("id", id);
  return !error;
}

// ── UPLOAD AUDIO ──────────────────────────────────────────────
export async function uploadAudio(
  userId: string,
  letterId: string,
  audioBlob: Blob
): Promise<string | null> {
  const supabase = createClient();
  const path = `${userId}/${letterId}.webm`;

  try {
    const { error } = await supabase.storage
      .from("audio")
      .upload(path, audioBlob, { contentType: "audio/webm", upsert: true });

    if (error) {
      console.error("[uploadAudio]", error.message);
      return null;
    }

    await supabase.from("letters").update({ audio_storage_path: path }).eq("id", letterId);
    return path;
  } catch (err) {
    console.error("[uploadAudio] exception:", err);
    return null;
  }
}

// ── UPLOAD PDF ────────────────────────────────────────────────
export async function uploadPdf(
  userId: string,
  letterId: string,
  pdfBlob: Blob
): Promise<string | null> {
  const supabase = createClient();
  const path = `${userId}/${letterId}.pdf`;

  try {
    const { error } = await supabase.storage
      .from("pdfs")
      .upload(path, pdfBlob, { contentType: "application/pdf", upsert: true });

    if (error) {
      console.error("[uploadPdf]", error.message);
      return null;
    }

    await savePdfPath(letterId, path);
    return path;
  } catch (err) {
    console.error("[uploadPdf] exception:", err);
    return null;
  }
}

// ── GET SIGNED PDF URL ────────────────────────────────────────
export async function getSignedPdfUrl(pdfPath: string): Promise<string | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.storage
      .from("pdfs")
      .createSignedUrl(pdfPath, 3600); // 1 hour
    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}

// ── MAP DB ROW → Letter TYPE ──────────────────────────────────
function mapDbToLetter(row: Record<string, unknown>): Letter {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    recipientName: row.recipient_name as string,
    recipientEmail: row.recipient_email as string,
    senderName: row.sender_name as string,
    eventType: row.event_type as EventType,
    eventDate: row.event_date as string,
    letterText: row.letter_text as string,
    transcript: row.transcript as string ?? "",
    year: row.year_referenced as string ?? "",
    status: row.status as Letter["status"],
    pdfUrl: row.pdf_storage_path as string ?? undefined,
    audioUrl: row.audio_storage_path as string ?? undefined,
    mailingAddress: row.mailing_line1
      ? {
          line1: row.mailing_line1 as string,
          line2: row.mailing_line2 as string ?? undefined,
          city: row.mailing_city as string,
          state: row.mailing_state as string,
          zip: row.mailing_zip as string,
          country: row.mailing_country as string ?? "US",
        }
      : undefined,
    physicalStatus: row.physical_status as Letter["physicalStatus"],
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}
