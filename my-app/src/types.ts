import type { COUNTRIES } from "./constants";

export type Gender = "female" | "male" | "other";
export type Country = (typeof COUNTRIES)[number];
export interface formData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: Gender;
  country: Country;
  agreement: boolean;
  file: string;
}

export type FormProps = {
  onSubmit: ({}: formData) => void;
};
