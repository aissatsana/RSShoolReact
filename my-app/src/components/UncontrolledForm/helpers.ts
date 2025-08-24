import { SPECIAL_REGEX } from "../../constants";
import type { Strength } from "./types";

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        res(reader.result);
      } else {
        rej(new Error("Unexpected result type"));
      }
    };
    reader.onerror = () => rej(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

export const getPasswordStrength = (password: string): { score: number; label: Strength } => {
  const checks = [/[0-9]/.test(password), /[a-z]/.test(password), /[A-Z]/.test(password), SPECIAL_REGEX.test(password)];

  const score = checks.filter(Boolean).length;

  if (score <= 1) return { score, label: "weak" };
  if (score <= 3) return { score, label: "medium" };
  return { score, label: "strong" };
};
