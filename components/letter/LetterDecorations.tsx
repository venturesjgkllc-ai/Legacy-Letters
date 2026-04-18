import { EventType } from "@/types";

interface HeaderProps {
  eventType: EventType;
  recipientName?: string;
  className?: string;
}

// Birthday header: hand-drawn cake with candles, warm sketch style
export function BirthdayHeader({ recipientName, className = "" }: { recipientName?: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 600 140"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Birthday cake illustration header"
    >
      {/* Sketchy border top */}
      <path d="M10 8 Q150 4 300 8 Q450 12 590 8" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 12 Q150 8 300 12 Q450 16 590 12" stroke="#D4A017" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* Birthday cake - sketchy hand-drawn style */}
      {/* Cake base */}
      <path d="M245 105 Q247 103 270 102 Q295 101 325 102 Q348 103 355 105 L350 120 Q300 125 250 120 Z" fill="#F5E6D3" stroke="#8B4513" strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Cake middle tier */}
      <path d="M255 85 Q258 83 275 82 Q300 81 325 82 Q342 83 345 85 L350 105 Q300 109 250 105 Z" fill="#FDF0DC" stroke="#8B4513" strokeWidth="1.2"/>
      {/* Frosting drips on middle tier */}
      <path d="M260 85 Q263 90 262 93" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M280 83 Q282 89 281 92" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M305 82 Q307 88 306 91" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M328 83 Q330 88 329 92" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      {/* Cake top tier */}
      <path d="M265 65 Q268 63 285 62 Q300 61 315 62 Q330 63 335 65 L340 85 Q300 89 260 85 Z" fill="#FDF8F3" stroke="#8B4513" strokeWidth="1.2"/>
      {/* Frosting swirl on top */}
      <path d="M268 65 Q271 70 270 73" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M290 63 Q292 68 291 71" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M312 63 Q314 68 313 71" stroke="#D4A017" strokeWidth="1" fill="none" opacity="0.7"/>

      {/* Candles */}
      {[280, 295, 310, 325].map((x, i) => (
        <g key={i}>
          <rect x={x - 3} y={42} width={6} height={22} rx={2} fill={["#E8593C","#D4A017","#8B4513","#A67C52"][i]} stroke="#8B4513" strokeWidth="0.8" opacity="0.9"/>
          {/* Flame */}
          <path d={`M${x} ${42} Q${x+4} ${36} ${x} ${30} Q${x-4} ${36} ${x} ${42}`} fill="#D4A017" stroke="#8B4513" strokeWidth="0.5" opacity="0.9"/>
          <ellipse cx={x} cy={30} rx={2} ry={3} fill="#FAC775" opacity="0.8"/>
        </g>
      ))}

      {/* Sketchy flourishes left */}
      <path d="M30 75 Q55 65 80 75 Q95 80 85 90 Q70 98 55 88 Q45 80 60 72" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M20 85 Q35 78 50 85" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M60 95 Q65 88 75 92 Q80 96 74 100" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35"/>
      {/* Small stars */}
      <text x="100" y="68" fontSize="14" fill="#D4A017" opacity="0.5" fontFamily="serif">✦</text>
      <text x="115" y="85" fontSize="10" fill="#8B4513" opacity="0.35" fontFamily="serif">✦</text>

      {/* Flourishes right */}
      <path d="M570 75 Q545 65 520 75 Q505 80 515 90 Q530 98 545 88 Q555 80 540 72" stroke="#8B4513" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M580 85 Q565 78 550 85" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
      <text x="490" y="68" fontSize="14" fill="#D4A017" opacity="0.5" fontFamily="serif">✦</text>
      <text x="475" y="85" fontSize="10" fill="#8B4513" opacity="0.35" fontFamily="serif">✦</text>

      {/* "Happy Birthday" script */}
      <text x="300" y="135" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="22" fill="#8B4513" opacity="0.85">
        Happy Birthday{recipientName ? `, ${recipientName}` : ""}
      </text>
      <path d="M160 138 Q300 142 440 138" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Wedding header: rings, delicate floral, romantic
export function WeddingHeader({ recipientName, className = "" }: { recipientName?: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Wedding rings illustration header">
      <path d="M10 8 Q150 4 300 8 Q450 12 590 8" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 12 Q150 8 300 12 Q450 16 590 12" stroke="#D4A017" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* Interlinked rings */}
      <circle cx="280" cy="72" r="28" fill="none" stroke="#D4A017" strokeWidth="8" opacity="0.85"/>
      <circle cx="316" cy="72" r="28" fill="none" stroke="#C09B72" strokeWidth="8" opacity="0.85"/>
      {/* Ring shine lines */}
      <path d="M265 58 Q268 55 272 57" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M325 58 Q328 55 332 57" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

      {/* Floral branch left */}
      <path d="M20 80 Q60 60 120 70 Q150 75 170 65" stroke="#8B4513" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M60 60 Q65 50 75 52 Q72 62 65 65" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M95 65 Q100 55 108 58 Q105 67 98 69" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <ellipse cx="63" cy="53" rx="5" ry="7" fill="#D4A017" opacity="0.35" transform="rotate(-20,63,53)"/>
      <ellipse cx="98" cy="56" rx="4" ry="6" fill="#8B4513" opacity="0.25" transform="rotate(15,98,56)"/>
      <ellipse cx="75" cy="54" rx="3" ry="5" fill="#D4A017" opacity="0.3" transform="rotate(-10,75,54)"/>
      {/* Small flowers */}
      <circle cx="140" cy="64" r="5" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="140" cy="64" r="2" fill="#D4A017" opacity="0.4"/>
      <circle cx="125" cy="72" r="4" fill="none" stroke="#8B4513" strokeWidth="0.8" opacity="0.4"/>

      {/* Floral branch right (mirror) */}
      <path d="M580 80 Q540 60 480 70 Q450 75 430 65" stroke="#8B4513" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M540 60 Q535 50 525 52 Q528 62 535 65" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <path d="M505 65 Q500 55 492 58 Q495 67 502 69" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <ellipse cx="537" cy="53" rx="5" ry="7" fill="#D4A017" opacity="0.35" transform="rotate(20,537,53)"/>
      <ellipse cx="502" cy="56" rx="4" ry="6" fill="#8B4513" opacity="0.25" transform="rotate(-15,502,56)"/>
      <circle cx="460" cy="64" r="5" fill="none" stroke="#D4A017" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="460" cy="64" r="2" fill="#D4A017" opacity="0.4"/>

      <text x="300" y="130" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="22" fill="#8B4513" opacity="0.85">
        With Love on Your Wedding Day
      </text>
      <path d="M130 133 Q300 137 470 133" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Anniversary header: hearts, romantic script border
export function AnniversaryHeader({ recipientName, className = "" }: { recipientName?: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Anniversary hearts illustration header">
      <path d="M10 8 Q150 4 300 8 Q450 12 590 8" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 12 Q150 8 300 12 Q450 16 590 12" stroke="#D4A017" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* Large central heart */}
      <path d="M300 110 Q240 80 240 55 Q240 32 260 30 Q278 28 300 50 Q322 28 340 30 Q360 32 360 55 Q360 80 300 110Z" fill="#8B4513" opacity="0.12" stroke="#8B4513" strokeWidth="1.2"/>
      <path d="M300 105 Q245 77 245 55 Q245 35 263 33 Q280 31 300 52 Q320 31 337 33 Q355 35 355 55 Q355 77 300 105Z" fill="none" stroke="#D4A017" strokeWidth="1" opacity="0.5"/>

      {/* Smaller hearts scattered */}
      <path d="M120 65 Q105 50 105 40 Q105 30 115 29 Q124 28 130 38 Q136 28 145 29 Q155 30 155 40 Q155 50 130 65Z" fill="#D4A017" opacity="0.2" stroke="#8B4513" strokeWidth="0.8"/>
      <path d="M470 65 Q455 50 455 40 Q455 30 465 29 Q474 28 480 38 Q486 28 495 29 Q505 30 505 40 Q505 50 480 65Z" fill="#D4A017" opacity="0.2" stroke="#8B4513" strokeWidth="0.8"/>

      {/* Tiny hearts */}
      <path d="M55 80 Q48 72 48 67 Q48 62 53 62 Q57 61 60 66 Q63 61 67 62 Q72 62 72 67 Q72 72 60 80Z" fill="#8B4513" opacity="0.25"/>
      <path d="M540 80 Q533 72 533 67 Q533 62 538 62 Q542 61 545 66 Q548 61 552 62 Q557 62 557 67 Q557 72 545 80Z" fill="#8B4513" opacity="0.25"/>

      {/* Vine ornament left */}
      <path d="M10 100 Q30 85 55 90 Q70 93 80 85" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M25 88 Q30 80 38 83" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M580 100 Q560 85 535 90 Q520 93 510 85" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round"/>

      {/* Stars / sparkles */}
      {[[200,42],[400,42],[170,85],[430,85]].map(([x,y],i) => (
        <g key={i} opacity="0.35">
          <line x1={x} y1={y-8} x2={x} y2={y+8} stroke="#D4A017" strokeWidth="1"/>
          <line x1={x-8} y1={y} x2={x+8} y2={y} stroke="#D4A017" strokeWidth="1"/>
          <line x1={x-5} y1={y-5} x2={x+5} y2={y+5} stroke="#D4A017" strokeWidth="0.6"/>
          <line x1={x+5} y1={y-5} x2={x-5} y2={y+5} stroke="#D4A017" strokeWidth="0.6"/>
        </g>
      ))}

      <text x="300" y="130" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="22" fill="#8B4513" opacity="0.85">
        Happy Anniversary
      </text>
      <path d="M160 133 Q300 137 440 133" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Graduation header: mortarboard cap with diploma and ribbon
export function GraduationHeader({ recipientName, className = "" }: { recipientName?: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 140" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Graduation mortarboard illustration header">
      <path d="M10 8 Q150 4 300 8 Q450 12 590 8" stroke="#8B4513" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      <path d="M10 12 Q150 8 300 12 Q450 16 590 12" stroke="#D4A017" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* Mortarboard cap - hand-drawn */}
      {/* Board top (diamond/square) */}
      <path d="M300 20 L360 48 L300 58 L240 48 Z" fill="#2C1810" stroke="#8B4513" strokeWidth="1.2" opacity="0.85"/>
      {/* Cap body */}
      <path d="M262 48 Q262 80 270 85 Q300 92 330 85 Q338 80 338 48" fill="#2C1810" stroke="#8B4513" strokeWidth="1.2" opacity="0.85"/>
      {/* Tassel string */}
      <path d="M338 52 Q352 58 355 72 Q356 82 350 90" stroke="#D4A017" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.9"/>
      {/* Tassel end */}
      <path d="M344 90 Q350 88 356 90 Q362 88 365 90" stroke="#D4A017" strokeWidth="1.5" fill="none" opacity="0.85" strokeLinecap="round"/>
      <path d="M347 90 L345 106" stroke="#D4A017" strokeWidth="1" opacity="0.7"/>
      <path d="M351 90 L350 108" stroke="#D4A017" strokeWidth="1" opacity="0.7"/>
      <path d="M355 90 L355 106" stroke="#D4A017" strokeWidth="1" opacity="0.7"/>
      <path d="M359 90 L360 104" stroke="#D4A017" strokeWidth="1" opacity="0.7"/>

      {/* Diploma scroll left */}
      <rect x="60" y="50" width="55" height="70" rx="4" fill="#FDF0DC" stroke="#8B4513" strokeWidth="1" opacity="0.7"/>
      <rect x="55" y="50" width="8" height="70" rx="3" fill="#E8D5BA" stroke="#8B4513" strokeWidth="0.8" opacity="0.6"/>
      <rect x="112" y="50" width="8" height="70" rx="3" fill="#E8D5BA" stroke="#8B4513" strokeWidth="0.8" opacity="0.6"/>
      {/* Lines on diploma */}
      <path d="M68 68 Q88 66 107 68" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M68 76 Q88 74 107 76" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M68 84 Q88 82 107 84" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.3"/>
      {/* Ribbon on diploma */}
      <path d="M75 110 Q88 105 100 110" stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>

      {/* Diploma right (mirror) */}
      <rect x="485" y="50" width="55" height="70" rx="4" fill="#FDF0DC" stroke="#8B4513" strokeWidth="1" opacity="0.7"/>
      <rect x="480" y="50" width="8" height="70" rx="3" fill="#E8D5BA" stroke="#8B4513" strokeWidth="0.8" opacity="0.6"/>
      <rect x="537" y="50" width="8" height="70" rx="3" fill="#E8D5BA" stroke="#8B4513" strokeWidth="0.8" opacity="0.6"/>
      <path d="M493 68 Q513 66 532 68" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M493 76 Q513 74 532 76" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35"/>
      <path d="M493 84 Q513 82 532 84" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.3"/>
      <path d="M500 110 Q513 105 525 110" stroke="#8B4513" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round"/>

      {/* Stars */}
      <text x="185" y="50" fontSize="16" fill="#D4A017" opacity="0.45" fontFamily="serif">★</text>
      <text x="405" y="50" fontSize="16" fill="#D4A017" opacity="0.45" fontFamily="serif">★</text>
      <text x="195" y="80" fontSize="10" fill="#8B4513" opacity="0.3" fontFamily="serif">★</text>
      <text x="395" y="80" fontSize="10" fill="#8B4513" opacity="0.3" fontFamily="serif">★</text>

      <text x="300" y="128" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="22" fill="#8B4513" opacity="0.85">
        Congratulations, Graduate!
      </text>
      <path d="M150 131 Q300 135 450 131" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.5" strokeLinecap="round"/>
    </svg>
  );
}

// Footer: ornamental border, consistent across all events
export function LetterFooter({ senderName, className = "" }: { senderName?: string; className?: string }) {
  return (
    <svg viewBox="0 0 600 80" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Letter footer ornament">
      {/* Vine / floral footer ornament */}
      <path d="M20 30 Q100 20 200 28 Q300 35 400 28 Q500 20 580 30" stroke="#8B4513" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"/>

      {/* Central diamond ornament */}
      <path d="M290 18 L300 28 L310 18 L300 8 Z" fill="#D4A017" opacity="0.3" stroke="#8B4513" strokeWidth="0.8"/>
      <path d="M295 18 L300 24 L305 18 L300 12 Z" fill="#8B4513" opacity="0.2"/>

      {/* Left flourish */}
      <path d="M60 28 Q80 18 100 22 Q115 25 110 35 Q100 42 85 36 Q72 30 82 22" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M40 32 Q55 25 70 30" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M100 36 Q108 28 118 32" stroke="#8B4513" strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round"/>

      {/* Right flourish */}
      <path d="M540 28 Q520 18 500 22 Q485 25 490 35 Q500 42 515 36 Q528 30 518 22" stroke="#8B4513" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round"/>
      <path d="M560 32 Q545 25 530 30" stroke="#D4A017" strokeWidth="0.8" fill="none" opacity="0.4" strokeLinecap="round"/>
      <path d="M500 36 Q492 28 482 32" stroke="#8B4513" strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round"/>

      {/* Small leaf details */}
      <ellipse cx="150" cy="26" rx="6" ry="3" fill="#8B4513" opacity="0.15" transform="rotate(-20,150,26)"/>
      <ellipse cx="450" cy="26" rx="6" ry="3" fill="#8B4513" opacity="0.15" transform="rotate(20,450,26)"/>

      {/* Bottom double line */}
      <path d="M10 58 Q300 54 590 58" stroke="#8B4513" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.45"/>
      <path d="M10 62 Q300 58 590 62" stroke="#D4A017" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.35"/>

      {/* Tagline */}
      <text x="300" y="76" textAnchor="middle" fontFamily="Dancing Script, cursive" fontSize="13" fill="#8B4513" opacity="0.5">
        Created with Legacy Letters · legacyletters.com
      </text>
    </svg>
  );
}

// Main component that picks the right header
export function LetterHeader({ eventType, recipientName, className }: HeaderProps) {
  switch (eventType) {
    case "birthday": return <BirthdayHeader recipientName={recipientName} className={className} />;
    case "wedding": return <WeddingHeader recipientName={recipientName} className={className} />;
    case "anniversary": return <AnniversaryHeader recipientName={recipientName} className={className} />;
    case "graduation": return <GraduationHeader recipientName={recipientName} className={className} />;
    default: return <BirthdayHeader recipientName={recipientName} className={className} />;
  }
}
