export const COUNTRIES = ["Russia", "Slovenia", "Kazakhstan", "Belarus", "Ukraine"] as const;

export const EMAIL_REGEX = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)+([a-z]{2,18})$/i;
export const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/;
export const SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>_\-\\[\]]/;
export const IMAGE_TYPES = ["image/png", "image/jpeg"];

export const MAX_IMAGE_MB = 1;
