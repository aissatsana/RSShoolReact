import { create } from "zustand";
import type { formData } from "../types";

type FormDataStore = {
  data: formData | null;
  setData: (data: formData) => void;
  clear: () => void;
};

export const useSubmissionStore = create<FormDataStore>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  clear: () => set({ data: null }),
}));
