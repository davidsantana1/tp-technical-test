export interface IdentifyDiscrepanciesResponse {
  data: Data[];
  analysis: Analysis[] | null;
}

type Status = "OK" | "ERROR";

export interface Data {
  timesheet: Timesheet;
  billing: Billing;
  contract: Contract;
  status: Status;
}

export interface Timesheet {
  project: string;
  id: number;
  employee_id: number;
  employee_name: string;
  hours_worked: number;
}

export interface Billing {
  project: string;
  rate_charged: number;
  id: number;
  employee_id: number;
  hours_billed: number;
}

export interface Contract {
  rate_per_hour: number;
  project: string;
  id: number;
  max_hours_per_week: number;
}

export interface Analysis {
  citations: any;
  text: string;
  type: string;
}
