import ENDPOINTS from "@/api/endpoints";
import { api } from "@/api/axios";
import type {
  BillingMappingParams,
  ContractsMappingParams,
  TimesheetMappingParams,
} from "./types";

export const loadCSVFactory = <T>(endpoint: string) => {
  return async (file: File, params: T) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(endpoint, formData, {
      params,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  };
};

export const loadBilling = loadCSVFactory<BillingMappingParams>(
  ENDPOINTS.DATA_PROCESSING.LOAD_BILLING,
);
export const loadContracts = loadCSVFactory<ContractsMappingParams>(
  ENDPOINTS.DATA_PROCESSING.LOAD_CONTRACTS,
);
export const loadTimesheet = loadCSVFactory<TimesheetMappingParams>(
  ENDPOINTS.DATA_PROCESSING.LOAD_TIMESHEET,
);
