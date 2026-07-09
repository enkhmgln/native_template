import {
  useQuery as useBaseQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

type QueryOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  "queryKey" | "queryFn"
> & {
  silent?: boolean;
};

export function useQuery<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: QueryOptions<TData>,
) {
  const { silent, meta, ...rest } = options ?? {};

  return useBaseQuery({
    queryKey,
    queryFn,
    meta: {
      ...meta,
      silent,
    },
    ...rest,
  });
}
