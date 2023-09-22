import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function Timeout(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, Number(ms)));
}
