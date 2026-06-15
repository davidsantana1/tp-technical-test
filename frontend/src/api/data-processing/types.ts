export interface BillingMappingParams {
  employee_id: string;
  project: string;
  hours_billed: string;
  rate_charged: string;
}

export interface ContractsMappingParams {
  project: string;
  rate_per_hour: string;
  max_hours_per_week: string;
}

export interface TimesheetMappingParams {
  employee_id: string;
  employee_name: string;
  project: string;
  hours_worked: string;
}
