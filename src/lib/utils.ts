import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(
  value: number,
  isCrypto: boolean = false
): string {
  const options: Intl.NumberFormatOptions = {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: isCrypto ? 6 : 2,
  };
  return new Intl.NumberFormat('pt-BR', options).format(value);
}
