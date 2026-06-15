import ENDPOINTS from "@/api/endpoints";
import { api } from "@/api/axios";
import type { IdentifyDiscrepanciesResponse } from "./types";

export async function identifyDiscrepancies(client_rules?: string) {
  const { data } = await api.post<IdentifyDiscrepanciesResponse>(
    ENDPOINTS.BILLING.IDENTIFY_DISCREPANCIES,
    {
      client_rules,
    },
  );

  return data;
}
