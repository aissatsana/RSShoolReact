import { CO2_DATA_URL } from "./constants";

export type Co2Raw = Record<string, unknown>;

type Status = "idle" | "pending" | "success" | "error";

interface Resource<T> {
  status: Status;
  value: T | null;
  error: unknown | null;
  promise: Promise<T> | null;
  read(): T;
  preload(): void;
  invalidate(): void;
}

export const dataResource: Resource<Co2Raw> = {
  status: "idle",
  value: null,
  error: null,
  promise: null,

  read(): Co2Raw {
    if (this.status === "success" && this.value !== null) return this.value;
    if (this.status === "error" && this.error) throw this.error;
    if (this.status === "pending" && this.promise) throw this.promise;

    this.status = "pending";
    this.promise = fetch(CO2_DATA_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(
        (data) => {
          this.status = "success";
          this.value = data;
          this.error = null;
          return data;
        },
        (err: unknown) => {
          this.status = "error";
          this.error = err;
          this.value = null;
          throw err;
        }
      );

    throw this.promise;
  },

  preload() {
    if (this.status === "idle") {
      this.read();
    }
  },

  invalidate() {
    this.status = "idle";
    this.value = null;
    this.error = null;
    this.promise = null;
  },
};
