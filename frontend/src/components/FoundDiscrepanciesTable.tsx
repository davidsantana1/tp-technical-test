import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { Data } from "@/api/identify-discrepancies/types";

interface FoundDiscrepanciesTableProps {
  data: Data[];
}

export const FoundDiscrepanciesTable: React.FC<FoundDiscrepanciesTableProps> = ({ data }) => {
  const headers = [
    "Employee",
    "Project",
    "Timesheet Hours",
    "Billed Hours",
    "Rate Charged",
    "Contract Rate",
    "Max Hours Allowed",
    "Status",
  ]
  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-md overflow-hidden shadow-md">
      <div className="max-h-[320px] overflow-y-auto overflow-x-auto relative">
        <Table>
          <TableHeader className="bg-card/95 backdrop-blur-md sticky top-0 z-10 border-b border-border shadow-xs">
            <TableRow className="hover:bg-transparent">
              {headers.map((header, index) => (
                <TableHead key={index} className="font-semibold text-muted-foreground py-3">{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                No records audited yet.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => {
              const { status } = row
              const hasDiscrepancy = status === "ERROR";

              const { employee_name, employee_id, project, hours_worked } = row.timesheet
              const { hours_billed, rate_charged } = row.billing
              const { rate_per_hour, max_hours_per_week } = row.contract

              return (
                <TableRow
                  key={index}
                  className={`transition-colors ${hasDiscrepancy
                    ? "bg-destructive/5 hover:bg-destructive/10 border-destructive/20"
                    : "hover:bg-muted/20"
                    }`}
                >
                  <TableCell className="font-medium text-foreground">
                    <div className="flex flex-col">
                      <span>{employee_name}</span>
                      <span className="text-xs text-muted-foreground">ID: {employee_id}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{project}</TableCell>
                  <TableCell className="text-center font-mono">{hours_worked} hrs</TableCell>
                  <TableCell className="text-center font-mono">{hours_billed} hrs</TableCell>
                  <TableCell className="text-right font-mono">${rate_charged}/hr</TableCell>
                  <TableCell className="text-right font-mono">${rate_per_hour}/hr</TableCell>
                  <TableCell className="text-center font-mono">{max_hours_per_week} hrs</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold shadow-xs ${hasDiscrepancy
                        ? "bg-destructive/15 text-destructive border border-destructive/30 animate-pulse"
                        : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        }`}
                    >
                      {status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};
