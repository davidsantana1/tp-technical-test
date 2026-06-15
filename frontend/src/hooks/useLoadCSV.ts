import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  BillingMappingParams,
  ContractsMappingParams,
  TimesheetMappingParams,
} from "@/api/data-processing/types";
import {
  loadBilling as apiLoadBilling,
  loadContracts as apiLoadContracts,
  loadTimesheet as apiLoadTimesheet,
} from "@/api/data-processing/index";

export interface LoadCSVResponse {
  data: any[];
}

export type LoadCSVOptions<TParams> = UseMutationOptions<
  LoadCSVResponse,
  Error,
  { file: File; params: TParams }
>;

function useLoadCSV<TParams>(
  mutationFn: (file: File, params: TParams) => Promise<LoadCSVResponse>,
  options?: LoadCSVOptions<TParams>,
) {
  return useMutation<LoadCSVResponse, Error, { file: File; params: TParams }>({
    mutationFn: ({ file, params }) => mutationFn(file, params),
    ...options,
  });
}

export const useLoadBilling = (
  options?: LoadCSVOptions<BillingMappingParams>,
) => useLoadCSV(apiLoadBilling, options);

export const useLoadContracts = (
  options?: LoadCSVOptions<ContractsMappingParams>,
) => useLoadCSV(apiLoadContracts, options);

export const useLoadTimesheet = (
  options?: LoadCSVOptions<TimesheetMappingParams>,
) => useLoadCSV(apiLoadTimesheet, options);
