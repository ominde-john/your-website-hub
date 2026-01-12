import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// WhatsApp contact number for orders
export const WHATSAPP_ORDER_NUMBER = "254115000514";

// Helper function to generate WhatsApp order URL
export function getWhatsAppOrderUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(message)}`;
}
