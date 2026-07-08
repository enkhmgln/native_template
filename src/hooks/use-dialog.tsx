import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { Dialog, type DialogMode } from "@/components/ui/dialog";
import type { FeedbackVariant } from "@/lib/theme";

type AlertOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  variant: FeedbackVariant;
};

type ConfirmOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant: FeedbackVariant;
};

type DialogState = {
  mode: DialogMode;
  options: AlertOptions | ConfirmOptions;
};

type DialogContextValue = {
  alert: (options: AlertOptions) => Promise<void>;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function DialogProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DialogState | null>(null);
  const [visible, setVisible] = useState(false);
  const alertResolverRef = useRef<(() => void) | null>(null);
  const confirmResolverRef = useRef<((value: boolean) => void) | null>(null);

  const alert = useCallback((options: AlertOptions) => {
    return new Promise<void>((resolve) => {
      alertResolverRef.current = resolve;
      confirmResolverRef.current = null;
      setState({ mode: "alert", options });
      setVisible(true);
    });
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      confirmResolverRef.current = resolve;
      alertResolverRef.current = null;
      setState({ mode: "confirm", options });
      setVisible(true);
    });
  }, []);

  const closeAlert = useCallback(() => {
    setVisible(false);
    setState(null);
    alertResolverRef.current?.();
    alertResolverRef.current = null;
  }, []);

  const closeConfirm = useCallback((result: boolean) => {
    setVisible(false);
    setState(null);
    confirmResolverRef.current?.(result);
    confirmResolverRef.current = null;
  }, []);

  const value = useMemo(() => ({ alert, confirm }), [alert, confirm]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {state ? (
        <Dialog
          cancelLabel={"cancelLabel" in state.options ? state.options.cancelLabel : undefined}
          confirmLabel={state.options.confirmLabel}
          message={state.options.message}
          mode={state.mode}
          onCancel={() => closeConfirm(false)}
          onConfirm={() => (state.mode === "alert" ? closeAlert() : closeConfirm(true))}
          title={state.options.title}
          variant={state.options.variant}
          visible={visible}
        />
      ) : null}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider");
  }
  return context;
}
