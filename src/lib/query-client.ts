import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { useDialogStore } from "@/stores/dialog-store";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.meta?.silent) {
        return;
      }

      void useDialogStore.getState().alert({
        message: error instanceof Error ? error.message : undefined,
        variant: "error",
      });
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.silent) {
        return;
      }

      void useDialogStore.getState().alert({
        message: error instanceof Error ? error.message : undefined,
        variant: "error",
      });
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
