import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getEventEmoji(eventType: EventType): string {
  const emojis: Record<EventType, string> = {
    birthday: "🎂",
    wedding: "💍",
    anniversary: "❤️",
    graduation: "🎓",
  };
  return emojis[eventType];
}

export function getEventColor(eventType: EventType): string {
  const colors: Record<EventType, string> = {
    birthday: "bg-gold/10 text-gold-dark border-gold/30",
    wedding: "bg-sepia-100 text-sepia-700 border-sepia-300",
    anniversary: "bg-burgundy/10 text-burgundy-dark border-burgundy/30",
    graduation: "bg-sepia-50 text-sepia-600 border-sepia-200",
  };
  return colors[eventType];
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}
