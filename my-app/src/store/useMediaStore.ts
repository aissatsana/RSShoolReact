import { create } from "zustand";

type MediaState = {
  imageBase64: string | null;
  error: string | null;
  setImageBase64: (b64: string | null) => void;
  setError: (message: string) => void;
  reset: () => void;
};

export const useMediaStore = create<MediaState>((set) => ({
  imageBase64: null,
  error: null,
  setImageBase64: (b64) => set({ imageBase64: b64, error: null }),
  setError: (message) => set({ error: message }),
  reset: () => set({ imageBase64: null, error: null }),
}));
