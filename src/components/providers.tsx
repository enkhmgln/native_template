import { QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { OverlayHost } from "@/components/overlay-host";
import { queryClient } from "@/lib/query-client";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <OverlayHost />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
