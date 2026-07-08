import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error";

export type ToastShowOptions = {
  message: string;
  variant?: ToastVariant;
};

export type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastStore = {
  toast: ToastItem | null;
  show: (input: string | ToastShowOptions, variant?: ToastVariant) => void;
  hide: () => void;
};

function resolveToast(
  input: string | ToastShowOptions,
  variant?: ToastVariant,
): ToastItem {
  if (typeof input === "string") {
    return {
      id: Date.now(),
      message: input,
      variant: variant ?? "default",
    };
  }

  return {
    id: Date.now(),
    message: input.message,
    variant: input.variant ?? "default",
  };
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  show: (input, variant) => set({ toast: resolveToast(input, variant) }),
  hide: () => set({ toast: null }),
}));
