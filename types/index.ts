export type EventType = "birthday" | "wedding" | "anniversary" | "graduation";

export interface WizardState {
  // Step 1: Event
  eventType: EventType | null;
  eventDate: string; // ISO date string
  recipientName: string;

  // Step 2: Recipient
  recipientEmail: string;
  recipientRelationship: string;
  mailingAddress?: MailingAddress;

  // Step 3: Sender
  senderName: string;
  fromNote: string;

  // Step 4: Prompt
  selectedPrompt: string;
  customPrompt: string;

  // Step 5: Recording
  audioBlob: Blob | null;
  audioUrl: string | null;
  recordingDuration: number;

  // Step 6: Preview
  transcript: string;
  letterText: string;
  year: string;

  // Package
  packageId: string | null;
}

export interface MailingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Letter {
  id: string;
  userId: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  eventType: EventType;
  eventDate: string;
  letterText: string;
  transcript: string;
  year: string;
  status: "draft" | "scheduled" | "sent" | "failed";
  pdfUrl?: string;
  audioUrl?: string;
  packageId?: string;
  mailingAddress?: MailingAddress;
  physicalStatus?: "pending" | "printing" | "mailed" | "delivered";
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  name: string;
  letterCount: number;
  priceUsd: number;
  priceId: string; // Stripe price ID
  popular?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "pkg_3",
    name: "Keepsake",
    letterCount: 3,
    priceUsd: 29,
    priceId: "price_mock_3letters",
  },
  {
    id: "pkg_6",
    name: "Legacy",
    letterCount: 6,
    priceUsd: 59,
    priceId: "price_mock_6letters",
    popular: true,
  },
  {
    id: "pkg_10",
    name: "Heritage",
    letterCount: 10,
    priceUsd: 89,
    priceId: "price_mock_10letters",
  },
];

export const EVENT_LABELS: Record<EventType, string> = {
  birthday: "Birthday",
  wedding: "Wedding",
  anniversary: "Anniversary",
  graduation: "Graduation",
};
