export const COUNTRIES = ["Russia", "Slovenia", "Kazakhstan", "Belarus", "Ukraine"] as const;
export type Country = (typeof COUNTRIES)[number];
