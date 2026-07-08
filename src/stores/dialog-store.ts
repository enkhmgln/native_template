import { create } from "zustand";

import type { DialogMode } from "@/components/ui/dialog";
import type { FeedbackVariant } from "@/lib/theme";

export type AlertOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  variant: FeedbackVariant;
};

export type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant: FeedbackVariant;
};

type DialogStoreState = {
  mode: DialogMode;
  options: AlertOptions | ConfirmOptions;
};

type DialogStore = {
  state: DialogStoreState | null;
  visible: boolean;
  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  closeAlert: () => void;
  closeConfirm: (result: boolean) => void;
};

let alertResolver: (() => void) | null = null;
let confirmResolver: ((value: boolean) => void) | null = null;

export const useDialogStore = create<DialogStore>((set) => ({
  state: null,
  visible: false,

  alert: (options) =>
    new Promise<void>((resolve) => {
      alertResolver = resolve;
      confirmResolver = null;
      set({ state: { mode: "alert", options }, visible: true });
    }),

  confirm: (options) =>
    new Promise<boolean>((resolve) => {
      confirmResolver = resolve;
      alertResolver = null;
      set({ state: { mode: "confirm", options }, visible: true });
    }),

  closeAlert: () => {
    set({ state: null, visible: false });
    alertResolver?.();
    alertResolver = null;
  },

  closeConfirm: (result) => {
    set({ state: null, visible: false });
    confirmResolver?.(result);
    confirmResolver = null;
  },
}));
