import { Dialog } from "@/components/ui/dialog";
import { Toast } from "@/components/ui/toast";
import { queryClient } from "@/lib/query-client";
import { useDialogStore } from "@/stores/dialog-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function Providers({ children }: PropsWithChildren) {
  const state = useDialogStore((store) => store.state);
  const visible = useDialogStore((store) => store.visible);
  const closeAlert = useDialogStore((store) => store.closeAlert);
  const closeConfirm = useDialogStore((store) => store.closeConfirm);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toast />
        {state ? (
          <Dialog
            cancelLabel={
              "cancelLabel" in state.options
                ? state.options.cancelLabel
                : undefined
            }
            confirmLabel={state.options.confirmLabel}
            message={state.options.message}
            mode={state.mode}
            onCancel={() => closeConfirm(false)}
            onConfirm={() =>
              state.mode === "alert" ? closeAlert() : closeConfirm(true)
            }
            title={state.options.title}
            variant={state.options.variant}
            visible={visible}
          />
        ) : null}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
