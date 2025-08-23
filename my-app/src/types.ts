export type Countries = "Russia" | "Slovenia";

export interface formData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: "female" | "male" | "other";
  country: Countries;
  agreement: boolean;
  file: string;
}
