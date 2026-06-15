import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoundDiscrepanciesTable } from "@/components/FoundDiscrepanciesTable";
import { AiFindings } from "@/components/AiFindings";
import type { Data, IdentifyDiscrepanciesResponse } from "@/api/identify-discrepancies/types";

interface AuditResultsProps {
  auditResult: IdentifyDiscrepanciesResponse;
}

const CSV_HEADERS = [
  "Employee",
  "Employee ID",
  "Project",
  "Timesheet Hours",
  "Billed Hours",
  "Rate Charged",
  "Contract Rate",
  "Max Hours Allowed",
  "Status",
];

const toCsvCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;

const downloadCsv = (data: Data[]) => {
  const rows = data.map((row) => [
    row.timesheet.employee_name,
    row.timesheet.employee_id,
    row.timesheet.project,
    row.timesheet.hours_worked,
    row.billing.hours_billed,
    row.billing.rate_charged,
    row.contract.rate_per_hour,
    row.contract.max_hours_per_week,
    row.status,
  ]);
  const csv = [CSV_HEADERS, ...rows].map((cells) => cells.map(toCsvCell).join(",")).join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-results.csv";
  link.click();
  URL.revokeObjectURL(url);
};

export const AuditResults: React.FC<AuditResultsProps> = ({ auditResult }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
          <span>Audited Records</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-normal text-muted-foreground/85">
              ({auditResult.data.length} records)
            </span>
            <Button
              type="button"
              variant="outline"
              size="xs"
              onClick={() => downloadCsv(auditResult.data)}
            >
              <Download /> CSV
            </Button>
          </div>
        </h3>
        <FoundDiscrepanciesTable data={auditResult.data} />
      </div>

      <AiFindings analysis={auditResult.analysis} />
    </div>
  );
};
