import React from "react";
import type { UseFormRegister, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { Loader2, Play, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ColumnMappings } from "@/components/ColumnMappings";

export interface AuditFormValues {
  timesheetFile: FileList;
  billingFile: FileList;
  contractFile: FileList;
  clientRules: string;
  ts_employee_id: string;
  ts_employee_name: string;
  ts_project: string;
  ts_hours_worked: string;
  bill_employee_id: string;
  bill_project: string;
  bill_hours_billed: string;
  bill_rate_charged: string;
  contract_project: string;
  contract_rate_per_hour: string;
  contract_max_hours_per_week: string;
}

interface AuditFormProps {
  register: UseFormRegister<AuditFormValues>;
  handleSubmit: UseFormHandleSubmit<AuditFormValues>;
  onSubmit: (data: AuditFormValues) => void;
  errors: FieldErrors<AuditFormValues>;
  isLoading: boolean;
  loadingStep: string | null;
  submitError: string | null;
  auditError: Error | null;
}

const fileFields = [
  {
    id: "timesheetFile",
    label: "Timesheet CSV",
    requiredMsg: "Timesheet file is required",
  },
  {
    id: "billingFile",
    label: "Billing CSV",
    requiredMsg: "Billing file is required",
  },
  {
    id: "contractFile",
    label: "Contract CSV",
    requiredMsg: "Contract file is required",
  },
] as const;

export const AuditForm: React.FC<AuditFormProps> = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  isLoading,
  loadingStep,
  submitError,
  auditError,
}) => {
  return (
    <Card className="border border-border bg-card/40 backdrop-blur-md shadow-lg">
      <CardContent className="p-4 pt-5 space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fileFields.map((field) => (
              <div key={field.id} className="space-y-1">
                <Label htmlFor={field.id} className="text-xs text-muted-foreground">{field.label}</Label>
                <Input
                  id={field.id}
                  type="file"
                  accept=".csv"
                  disabled={isLoading}
                  className="text-xs h-9 py-1 file:text-xs"
                  {...register(field.id, { required: field.requiredMsg })}
                />
                {errors[field.id] && (
                  <p className="text-[10px] text-destructive">{errors[field.id]?.message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <Label htmlFor="clientRules" className="text-xs text-muted-foreground">Client Rules (Optional)</Label>
            <textarea
              id="clientRules"
              rows={2}
              disabled={isLoading}
              placeholder="e.g. Employee billing rates should never exceed $30/hr. Charlie should only work max 40 hours per week."
              className="w-full min-h-12 rounded-md border border-input bg-transparent px-3 py-1.5 text-xs placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/10"
              {...register("clientRules")}
            />
          </div>

          <ColumnMappings register={register} />

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <Button
              type="submit"
              disabled={isLoading}
              className="sm:w-48 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs h-9 transition-all active:scale-95 cursor-pointer animate-none"
            >
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {loadingStep || "Analyzing..."}
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" /> Run Audits
                </span>
              )}
            </Button>

            {(submitError || auditError) && (
              <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded border border-destructive/20 bg-destructive/5 text-destructive text-[11px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>
                  <strong>Execution Failed:</strong>{" "}
                  {submitError || auditError?.message || "An unexpected error occurred."}
                </span>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
