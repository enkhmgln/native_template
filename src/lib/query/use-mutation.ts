import {
  useMutation as useBaseMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

type MutationOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables>,
  "mutationFn"
> & {
  silent?: boolean;
};

export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationOptions<TData, TVariables>,
) {
  const { silent, meta, ...rest } = options ?? {};

  return useBaseMutation({
    mutationFn,
    meta: {
      ...meta,
      silent,
    },
    ...rest,
  });
}
