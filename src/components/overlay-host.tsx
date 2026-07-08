import { Dialog } from "@/components/ui/dialog";
import { ToastHost } from "@/components/toast-host";
import { useDialogStore } from "@/stores/dialog-store";

export function OverlayHost() {
  const state = useDialogStore((store) => store.state);
  const visible = useDialogStore((store) => store.visible);
  const closeAlert = useDialogStore((store) => store.closeAlert);
  const closeConfirm = useDialogStore((store) => store.closeConfirm);

  return (
    <>
      <ToastHost />
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
    </>
  );
}
