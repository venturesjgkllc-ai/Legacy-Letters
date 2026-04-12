import { EventType } from "@/types";

interface PdfLetterData {
  recipientName: string;
  senderName: string;
  fromNote?: string;
  eventType: EventType;
  eventDate: string;
  letterText: string;
  year?: string;
}

// ── EVENT CONFIG ─────────────────────────────────────────────
const EVENT_CONFIG: Record<EventType, { title: string; subtitle: string; emoji: string; accentHex: string }> = {
  birthday:    { title: "Happy Birthday",                   subtitle: "A letter from the heart", emoji: "🎂", accentHex: "#D4A017" },
  wedding:     { title: "With Love on Your Wedding Day",    subtitle: "A letter from the heart", emoji: "💍", accentHex: "#8B4513" },
  anniversary: { title: "Happy Anniversary",                subtitle: "A letter from the heart", emoji: "❤️", accentHex: "#8B4513" },
  graduation:  { title: "Congratulations, Graduate!",       subtitle: "A letter from the heart", emoji: "🎓", accentHex: "#D4A017" },
};

// ── COLOR PALETTE ────────────────────────────────────────────
const BURGUNDY: [number, number, number]   = [139, 69, 19];
const GOLD:     [number, number, number]   = [212, 160, 23];
const INK:      [number, number, number]   = [44, 24, 16];
const SEPIA:    [number, number, number]   = [168, 124, 82];
const PARCHMENT:[number, number, number]   = [253, 246, 227];
const CREAM:    [number, number, number]   = [253, 248, 243];
const LIGHT:    [number, number, number]   = [232, 213, 186];

function formatEventDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

// ── DRAW BIRTHDAY HEADER ─────────────────────────────────────
function drawBirthdayHeader(doc: import("jspdf").jsPDF, pageW: number): void {
  const cx = pageW / 2;
  // Parchment bg strip
  doc.setFillColor(...PARCHMENT);
  doc.rect(0, 0, pageW, 52, "F");

  // Wavy top border lines
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([2, 1], 0);
  doc.line(10, 4, pageW - 10, 4);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.25);
  doc.line(10, 6, pageW - 10, 6);
  doc.setLineDashPattern([], 0);

  // Cake base (bottom tier)
  doc.setFillColor(245, 230, 211);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.roundedRect(cx - 22, 34, 44, 12, 2, 2, "FD");
  // Cake middle tier
  doc.setFillColor(253, 240, 220);
  doc.roundedRect(cx - 18, 24, 36, 11, 2, 2, "FD");
  // Cake top tier
  doc.setFillColor(...CREAM);
  doc.roundedRect(cx - 13, 16, 26, 9, 2, 2, "FD");

  // Candles
  const candleColors: Array<[number,number,number]> = [
    [232,89,60], [212,160,23], [139,69,19], [166,124,82]
  ];
  const candleXs = [cx - 8, cx - 2, cx + 4, cx + 10];
  candleXs.forEach((cx2, i) => {
    doc.setFillColor(...candleColors[i]);
    doc.roundedRect(cx2 - 1.2, 9, 2.4, 7, 0.5, 0.5, "F");
    // Flame
    doc.setFillColor(...GOLD);
    doc.ellipse(cx2, 8, 1.5, 2, "F");
  });

  // Frosting drips - gold squiggles
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  [cx-10, cx-2, cx+6].forEach(x => {
    doc.line(x, 24, x - 0.5, 27);
  });
  [cx-10, cx-2, cx+6].forEach(x => {
    doc.line(x, 34, x - 0.5, 37);
  });

  // Left flourish (simple curves)
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([1, 0.5], 0);
  doc.line(14, 28, 28, 22);
  doc.line(14, 32, 26, 27);
  doc.setLineDashPattern([], 0);

  // Right flourish
  doc.line(pageW - 14, 28, pageW - 28, 22);
  doc.line(pageW - 14, 32, pageW - 26, 27);

  // Small stars
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text("✦", 34, 24);
  doc.text("✦", pageW - 38, 24);
  doc.text("✦", 40, 32);
  doc.text("✦", pageW - 44, 32);

  // Title script
  doc.setFont("times", "bolditalic");
  doc.setFontSize(16);
  doc.setTextColor(...BURGUNDY);
  doc.text("Happy Birthday", cx, 47, { align: "center" });

  // Separator line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(cx - 30, 50, cx + 30, 50);
}

// ── DRAW WEDDING HEADER ──────────────────────────────────────
function drawWeddingHeader(doc: import("jspdf").jsPDF, pageW: number): void {
  const cx = pageW / 2;
  doc.setFillColor(...PARCHMENT);
  doc.rect(0, 0, pageW, 52, "F");

  // Border lines
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([2, 1], 0);
  doc.line(10, 4, pageW - 10, 4);
  doc.setLineDashPattern([], 0);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.25);
  doc.line(10, 6, pageW - 10, 6);

  // Interlinked rings
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(2.5);
  doc.setFillColor(0, 0, 0, 0);
  doc.circle(cx - 5, 28, 10, "S");
  doc.setDrawColor(...SEPIA);
  doc.circle(cx + 5, 28, 10, "S");

  // Floral stems left
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.line(20, 38, 50, 26);
  doc.line(30, 26, 35, 18);
  doc.line(42, 28, 46, 20);
  // Petals (simple ellipses)
  doc.setFillColor(...GOLD);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.3);
  doc.ellipse(35, 16, 3, 4, "FD");
  doc.ellipse(47, 18, 2.5, 3.5, "FD");
  doc.setFillColor(253, 246, 227);
  doc.circle(55, 26, 3, "FD");

  // Floral stems right (mirror)
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.line(pageW - 20, 38, pageW - 50, 26);
  doc.line(pageW - 30, 26, pageW - 35, 18);
  doc.line(pageW - 42, 28, pageW - 46, 20);
  doc.setFillColor(...GOLD);
  doc.ellipse(pageW - 35, 16, 3, 4, "FD");
  doc.ellipse(pageW - 47, 18, 2.5, 3.5, "FD");
  doc.setFillColor(253, 246, 227);
  doc.circle(pageW - 55, 26, 3, "FD");

  doc.setFont("times", "bolditalic");
  doc.setFontSize(14);
  doc.setTextColor(...BURGUNDY);
  doc.text("With Love on Your Wedding Day", cx, 47, { align: "center" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(cx - 40, 50, cx + 40, 50);
}

// ── DRAW ANNIVERSARY HEADER ──────────────────────────────────
function drawAnniversaryHeader(doc: import("jspdf").jsPDF, pageW: number): void {
  const cx = pageW / 2;
  doc.setFillColor(...PARCHMENT);
  doc.rect(0, 0, pageW, 52, "F");

  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([2, 1], 0);
  doc.line(10, 4, pageW - 10, 4);
  doc.setLineDashPattern([], 0);

  // Central heart
  const hx = cx, hy = 28, hs = 14;
  doc.setFillColor(139, 69, 19, 0.15);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.5);
  // Heart approximation with bezier (jsPDF path)
  const pathData = `M ${hx} ${hy + hs * 0.5} C ${hx - hs * 1.5} ${hy - hs * 0.3} ${hx - hs * 2} ${hy - hs * 1.2} ${hx - hs * 0.8} ${hy - hs * 1.4} C ${hx - hs * 0.3} ${hy - hs * 1.5} ${hx} ${hy - hs * 1.0} ${hx} ${hy - hs * 1.0} C ${hx} ${hy - hs * 1.0} ${hx + hs * 0.3} ${hy - hs * 1.5} ${hx + hs * 0.8} ${hy - hs * 1.4} C ${hx + hs * 2} ${hy - hs * 1.2} ${hx + hs * 1.5} ${hy - hs * 0.3} ${hx} ${hy + hs * 0.5} Z`;
  // Use simple approximation via lines since jsPDF path is complex:
  doc.setFillColor(220, 150, 100);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.6);
  // Draw simplified heart using two circles + triangle
  doc.setFillColor(232, 200, 180);
  doc.circle(hx - 5, hy - 4, 7, "FD");
  doc.circle(hx + 5, hy - 4, 7, "FD");

  // Sparkles
  const sparkles = [[22, 22], [pageW - 22, 22], [20, 36], [pageW - 20, 36]];
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  sparkles.forEach(([sx, sy]) => {
    doc.line(sx, sy - 5, sx, sy + 5);
    doc.line(sx - 5, sy, sx + 5, sy);
    doc.setLineWidth(0.3);
    doc.line(sx - 3, sy - 3, sx + 3, sy + 3);
    doc.line(sx + 3, sy - 3, sx - 3, sy + 3);
    doc.setLineWidth(0.5);
  });

  // Side hearts (small)
  doc.setFillColor(...GOLD);
  [45, pageW - 45].forEach(x => {
    doc.circle(x - 3, 26, 4, "FD");
    doc.circle(x + 3, 26, 4, "FD");
  });

  doc.setFont("times", "bolditalic");
  doc.setFontSize(15);
  doc.setTextColor(...BURGUNDY);
  doc.text("Happy Anniversary", cx, 47, { align: "center" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(cx - 28, 50, cx + 28, 50);
}

// ── DRAW GRADUATION HEADER ───────────────────────────────────
function drawGraduationHeader(doc: import("jspdf").jsPDF, pageW: number): void {
  const cx = pageW / 2;
  doc.setFillColor(...PARCHMENT);
  doc.rect(0, 0, pageW, 52, "F");

  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.setLineDashPattern([2, 1], 0);
  doc.line(10, 4, pageW - 10, 4);
  doc.setLineDashPattern([], 0);

  // Mortarboard cap board (diamond)
  doc.setFillColor(44, 24, 16);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.5);
  // Diamond shape
  doc.triangle(cx, 12, cx - 18, 24, cx, 30, "F");
  doc.triangle(cx, 12, cx + 18, 24, cx, 30, "F");
  // Cap body
  doc.setFillColor(44, 24, 16);
  doc.roundedRect(cx - 12, 24, 24, 14, 2, 2, "F");

  // Tassel
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.5);
  doc.line(cx + 12, 26, cx + 22, 32);
  doc.line(cx + 22, 32, cx + 22, 40);
  doc.setLineWidth(0.6);
  [cx+19, cx+22, cx+25].forEach(x => doc.line(x, 40, x, 46));

  // Diploma left
  doc.setFillColor(253, 240, 220);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.roundedRect(18, 18, 30, 28, 1.5, 1.5, "FD");
  doc.setFillColor(...SEPIA);
  doc.roundedRect(15, 18, 5, 28, 1.5, 1.5, "FD");
  doc.roundedRect(45, 18, 5, 28, 1.5, 1.5, "FD");
  // Lines on diploma
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.3);
  [24, 28, 32].forEach(y => doc.line(22, y, 42, y));
  // Ribbon
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(1);
  doc.line(25, 42, 40, 42);

  // Diploma right (mirror)
  doc.setFillColor(253, 240, 220);
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.roundedRect(pageW - 48, 18, 30, 28, 1.5, 1.5, "FD");
  doc.setFillColor(...SEPIA);
  doc.roundedRect(pageW - 51, 18, 5, 28, 1.5, 1.5, "FD");
  doc.roundedRect(pageW - 21, 18, 5, 28, 1.5, 1.5, "FD");
  [24, 28, 32].forEach(y => doc.line(pageW - 46, y, pageW - 26, y));
  doc.setLineWidth(1);
  doc.line(pageW - 43, 42, pageW - 27, 42);

  // Stars
  doc.setFontSize(10);
  doc.setTextColor(...GOLD);
  doc.text("★", cx - 30, 20);
  doc.text("★", cx + 26, 20);
  doc.setFontSize(7);
  doc.text("★", cx - 36, 32);
  doc.text("★", cx + 30, 32);

  doc.setFont("times", "bolditalic");
  doc.setFontSize(15);
  doc.setTextColor(...BURGUNDY);
  doc.text("Congratulations, Graduate!", cx, 47, { align: "center" });

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(cx - 36, 50, cx + 36, 50);
}

// ── DRAW FOOTER ──────────────────────────────────────────────
function drawFooter(doc: import("jspdf").jsPDF, pageW: number, pageH: number, senderName: string): void {
  const y = pageH - 28;

  // Ornamental vine line
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.4);
  doc.line(14, y, pageW - 14, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.25);
  doc.line(14, y + 2, pageW - 14, y + 2);

  // Central diamond ornament
  const cx = pageW / 2;
  doc.setFillColor(...GOLD);
  doc.setLineWidth(0);
  doc.triangle(cx, y - 3, cx - 3, y, cx, y + 3, "F");
  doc.triangle(cx, y - 3, cx + 3, y, cx, y + 3, "F");

  // Left flourish
  doc.setDrawColor(...BURGUNDY);
  doc.setLineWidth(0.35);
  doc.setLineDashPattern([1, 0.5], 0);
  doc.line(20, y + 6, 55, y + 1);
  doc.line(55, y + 1, 75, y + 5);
  doc.setLineDashPattern([], 0);

  // Right flourish (mirror)
  doc.setLineDashPattern([1, 0.5], 0);
  doc.line(pageW - 20, y + 6, pageW - 55, y + 1);
  doc.line(pageW - 55, y + 1, pageW - 75, y + 5);
  doc.setLineDashPattern([], 0);

  // Tagline
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...SEPIA);
  doc.text("Created with Legacy Letters · legacyletters.com", cx, pageH - 10, { align: "center" });
}

// ── DRAW PAGE BACKGROUND ─────────────────────────────────────
function drawParchmentBackground(doc: import("jspdf").jsPDF, pageW: number, pageH: number): void {
  // Base parchment color
  doc.setFillColor(...PARCHMENT);
  doc.rect(0, 0, pageW, pageH, "F");

  // Subtle ruled lines (like letter paper)
  doc.setDrawColor(200, 180, 155);
  doc.setLineWidth(0.1);
  for (let y = 62; y < pageH - 35; y += 7.5) {
    doc.line(14, y, pageW - 14, y);
  }

  // Margin line (left)
  doc.setDrawColor(212, 160, 23);
  doc.setLineWidth(0.2);
  doc.line(24, 60, 24, pageH - 32);
}

// ── MAIN PDF GENERATOR ────────────────────────────────────────
export async function generateLetterPdf(data: PdfLetterData): Promise<Blob> {
  // Dynamically import jsPDF (client-side only)
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter", // 215.9 x 279.4 mm
  });

  const pageW = doc.internal.pageSize.getWidth();   // 215.9
  const pageH = doc.internal.pageSize.getHeight();  // 279.4

  // ── Page background
  drawParchmentBackground(doc, pageW, pageH);

  // ── Header illustration
  switch (data.eventType) {
    case "birthday":    drawBirthdayHeader(doc, pageW); break;
    case "wedding":     drawWeddingHeader(doc, pageW); break;
    case "anniversary": drawAnniversaryHeader(doc, pageW); break;
    case "graduation":  drawGraduationHeader(doc, pageW); break;
  }

  // ── Year badge (subtle, top right)
  if (data.year) {
    doc.setFont("times", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...SEPIA);
    doc.text(data.year, pageW - 16, 12, { align: "right" });
  }

  // ── Letter body
  const bodyLeft = 28;
  const bodyRight = pageW - 16;
  const lineWidth = bodyRight - bodyLeft;
  let curY = 60;

  // "Dear [Name]," salutation
  doc.setFont("times", "bolditalic");
  doc.setFontSize(13);
  doc.setTextColor(...INK);
  doc.text(`Dear ${data.recipientName},`, bodyLeft, curY);
  curY += 9;

  // Letter body paragraphs
  doc.setFont("times", "italic");
  doc.setFontSize(11.5);
  doc.setTextColor(60, 35, 20);

  const paragraphs = data.letterText
    .replace(/^Dear [^,]+,\s*/i, "")  // Remove salutation if AI included it
    .replace(/With all my love.*$/is, "") // Remove closing if AI included it
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  const lineHeight = 6.2;

  for (const para of paragraphs) {
    const lines = doc.splitTextToSize(para, lineWidth);

    // Check page break
    if (curY + lines.length * lineHeight > pageH - 38) {
      doc.addPage();
      drawParchmentBackground(doc, pageW, pageH);
      drawFooter(doc, pageW, pageH, data.senderName);
      curY = 20;
    }

    doc.text(lines, bodyLeft, curY);
    curY += lines.length * lineHeight + 4;
  }

  // ── Closing
  curY += 4;
  if (curY > pageH - 55) {
    doc.addPage();
    drawParchmentBackground(doc, pageW, pageH);
    curY = 24;
  }

  doc.setFont("times", "italic");
  doc.setFontSize(12);
  doc.setTextColor(...INK);
  doc.text("With all my love, always,", bodyLeft, curY);
  curY += 9;

  // Signature in larger italic (simulating script)
  doc.setFont("times", "bolditalic");
  doc.setFontSize(16);
  doc.setTextColor(...BURGUNDY);
  doc.text(data.senderName, bodyLeft + 4, curY);
  curY += 6;

  // From note (if provided)
  if (data.fromNote) {
    curY += 4;
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...SEPIA);
    const noteLines = doc.splitTextToSize(`"${data.fromNote}"`, lineWidth - 20);
    doc.text(noteLines, bodyLeft + 8, curY);
  }

  // ── Delivery note at bottom
  const deliveryY = pageH - 38;
  doc.setFont("times", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...SEPIA);
  const deliveryText = `Delivered to ${data.recipientName} · ${formatEventDate(data.eventDate)}`;
  doc.text(deliveryText, pageW / 2, deliveryY, { align: "center" });

  // ── Footer illustration
  drawFooter(doc, pageW, pageH, data.senderName);

  return doc.output("blob");
}

// ── TRIGGER DOWNLOAD (client-side) ───────────────────────────
export function downloadPdf(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
