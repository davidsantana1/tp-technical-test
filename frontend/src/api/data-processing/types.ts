export interface BillingMappingParams {
  employee_id: string;
  project: string;
  hours_billed: string;
  rate_charged: string;
}

export interface ContractsMappingParams {
  employee_id: string;
  contract_number: string;
  project: string;
  hours_to_bill: string;
  start_date: string;
  end_date: string;
}

export interface TimesheetMappingParams {
  employee_id: string;
  date: string;
  project: string;
  hours: string;
}
