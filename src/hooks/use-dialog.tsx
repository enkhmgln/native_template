import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

import { Dialog } from "@/components/ui/dialog";
import type { FeedbackVariant } from "@/lib/theme";

type DialogOptions = {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: FeedbackVariant;
  /** @deprecated Use `variant: "danger"` instead. */
  destructive?: boolean;
};

type DialogContextValue = {
  confirm: (options: DialogOptions) => Promise<boolean>;
};

const DialogContext = createContext<DialogContextValue | null>(null);

function resolveVariant(options: DialogOptions): FeedbackVariant {
  if (options.variant) {
    return options.variant;
  }
  if (options.destructive) {
    return "danger";
  }
  return "default";
}

export function DialogProvider({ children }: PropsWithChildren) {
  const [options, setOptions] = useState<DialogOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((dialogOptions: DialogOptions) => {
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
      setOptions(dialogOptions);
      setVisible(true);
    });
  }, []);

  const close = useCallback((result: boolean) => {
    setVisible(false);
    setOptions(null);
    resolverRef.current?.(result);
    resolverRef.current = null;
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {options ? (
        <Dialog
          cancelLabel={options.cancelLabel}
          confirmLabel={options.confirmLabel}
          message={options.message}
          onCancel={() => close(false)}
          onConfirm={() => close(true)}
          title={options.title}
          variant={resolveVariant(options)}
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
