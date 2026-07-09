import { useToastStore } from "@/stores/toast-store";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

function toErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Алдаа гарлаа";
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.meta?.silent) {
        return;
      }

      useToastStore.getState().show(toErrorMessage(error), "error");
    },
  }),
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.silent) {
        return;
      }

      useToastStore.getState().show(toErrorMessage(error), "error");
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
