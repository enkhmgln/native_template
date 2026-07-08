import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { DialogProvider } from "@/hooks/use-dialog";
import { ToastProvider } from "@/hooks/use-toast";
import { queryClient } from "@/lib/query-client";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <DialogProvider>{children}</DialogProvider>
        </ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
