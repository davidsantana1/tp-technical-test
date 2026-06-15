import type { IdentifyDiscrepanciesResponse } from "@/api/identify-discrepancies/types";
import { identifyDiscrepancies as apiIdentifyDiscrepancies } from "@/api/identify-discrepancies";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export type UseIdentifyDiscrepanciesOptions = UseQueryOptions<
  IdentifyDiscrepanciesResponse,
  Error
>;

export function useIdentifyDiscrepancies(
  client_rules?: string,
  options?: UseIdentifyDiscrepanciesOptions,
) {
  return useQuery<IdentifyDiscrepanciesResponse, Error>({
    queryKey: ["identify-discrepancies", client_rules],
    queryFn: () => apiIdentifyDiscrepancies(client_rules),
    ...options,
  });
}
