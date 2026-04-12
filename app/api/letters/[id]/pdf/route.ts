import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // STUB: When real keys are set, generate PDF with jsPDF and return it:
  // 1. Fetch letter from Supabase by id
  // 2. Use jsPDF to render letter with header/footer SVGs
  // 3. Upload to Supabase Storage and return signed URL
  // 4. Or stream the PDF directly

  // Mock: return a simple text response for now
  return new NextResponse(
    `[Mock PDF for letter ${id}]\n\nThis will be a beautifully formatted PDF letter with illustrated header and footer when the service is fully configured.`,
    {
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="legacy-letter-${id}.txt"`,
      },
    }
  );
}
