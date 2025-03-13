import type { Shipment } from "@/repositories/Shipment/ShipmentRepository";

export const parseDateTimeString = (dateTime: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(dateTime);
  const defaultDateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Thu
    day: "2-digit",   // 18
    month: "short",   // Mar
  };

  const defaultTimeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use AM/PM format
  };

  return {
    date: date.toLocaleDateString("pt-Br", options ?? defaultDateOptions).replace(",", ""),
    time: date.toLocaleTimeString("pt-Br", options ?? defaultTimeOptions),
  }
}

export const parseMoney = (amount: number | string): string => {
  return Number(amount).toLocaleString(
    'pt-BR', { style: 'currency', currency: 'BRL' }
  )
};
