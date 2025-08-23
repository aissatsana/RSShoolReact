export const COUNTRIES = ["Russia", "Slovenia", "Kazakhstan", "Belarus", "Ukraine"] as const;
export type Country = (typeof COUNTRIES)[number];

export const EMAIL_REGEX = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)+([a-z]{2,18})$/i;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/;
