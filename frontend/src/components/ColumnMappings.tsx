import React, { useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ColumnMappingsProps {
  register: UseFormRegister<any>;
}

const timesheetMappings = [
  { id: "ts_employee_id", label: "Employee ID Col" },
  { id: "ts_employee_name", label: "Employee Name Col" },
  { id: "ts_project", label: "Project Col" },
  { id: "ts_hours_worked", label: "Hours Worked Col" },
] as const;

const billingMappings = [
  { id: "bill_employee_id", label: "Employee ID Col" },
  { id: "bill_project", label: "Project Col" },
  { id: "bill_hours_billed", label: "Hours Billed Col" },
  { id: "bill_rate_charged", label: "Rate Charged Col" },
] as const;

const contractMappings = [
  { id: "contract_project", label: "Project Col" },
  { id: "contract_rate_per_hour", label: "Rate Col" },
  { id: "contract_max_hours_per_week", label: "Max Hours Col" },
] as const;

export const ColumnMappings: React.FC<ColumnMappingsProps> = ({ register }) => {
  const [showMappings, setShowMappings] = useState(false);

  return (
    <div className="border border-border/40 rounded-md overflow-hidden bg-card/20">
      <button
        type="button"
        onClick={() => setShowMappings(!showMappings)}
        className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-muted-foreground hover:bg-muted/10 transition-colors"
      >
        <span className="flex items-center gap-1.5">
          <Settings2 className="w-3 h-3" /> Configure Column Mappings
        </span>
        <span>{showMappings ? "Hide" : "Show"}</span>
      </button>

      {showMappings && (
        <div className="p-3 bg-muted/5 border-t border-border/40 space-y-3 text-[11px]">
          <p className="text-muted-foreground text-[10px] leading-normal pb-1.5 border-b border-border/10">
            Specify the column headers of your CSV files that match the expected fields below.
          </p>

          <div className="space-y-1.5">
            <h4 className="font-bold text-muted-foreground uppercase tracking-wider">Timesheet Mappings</h4>
            <div className="grid grid-cols-4 gap-2">
              {timesheetMappings.map((field) => (
                <div key={field.id}>
                  <Label className="text-[9px] text-muted-foreground">{field.label}</Label>
                  <Input className="h-6 text-[10px] px-2" {...register(field.id)} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-muted-foreground uppercase tracking-wider">Billing Mappings</h4>
            <div className="grid grid-cols-4 gap-2">
              {billingMappings.map((field) => (
                <div key={field.id}>
                  <Label className="text-[9px] text-muted-foreground">{field.label}</Label>
                  <Input className="h-6 text-[10px] px-2" {...register(field.id)} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-muted-foreground uppercase tracking-wider">Contract Mappings</h4>
            <div className="grid grid-cols-3 gap-2">
              {contractMappings.map((field) => (
                <div key={field.id}>
                  <Label className="text-[9px] text-muted-foreground">{field.label}</Label>
                  <Input className="h-6 text-[10px] px-2" {...register(field.id)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
