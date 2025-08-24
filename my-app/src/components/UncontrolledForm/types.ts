import type { formData } from "../../types";

export interface UncontrolledFormProps {
  onSubmit: ({}: formData) => void;
}

export type Strength = "weak" | "medium" | "strong";
export type FormErrors = Partial<Record<keyof formData | "passwordConfirm", string | undefined>>;
