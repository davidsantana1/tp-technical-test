import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoadBilling, useLoadContracts, useLoadTimesheet } from "@/hooks/useLoadCSV";
import { useIdentifyDiscrepancies } from "@/hooks/useIdentifyDiscrepancies";
import { AuditForm, type AuditFormValues } from "@/components/AuditForm";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { LoadingState } from "@/components/LoadingState";
import { AuditResults } from "@/components/AuditResults";

export const Dashboard = () => {
  const [submittedRules, setSubmittedRules] = useState<string | undefined>(undefined);
  const [shouldFetchAudit, setShouldFetchAudit] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadTimesheet = useLoadTimesheet();
  const loadBilling = useLoadBilling();
  const loadContracts = useLoadContracts();

  const {
    data: auditResult,
    refetch: refetchAudit,
    isFetching: isAuditing,
    error: auditError,
  } = useIdentifyDiscrepancies(submittedRules, {
    enabled: shouldFetchAudit,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditFormValues>({
    defaultValues: {
      ts_employee_id: "Employee_ID",
      ts_employee_name: "Employee_Name",
      ts_project: "Project",
      ts_hours_worked: "Hours_Worked",

      bill_employee_id: "Employee_ID",
      bill_project: "Project",
      bill_hours_billed: "Hours_Billed",
      bill_rate_charged: "Rate_Charged",

      contract_project: "Project",
      contract_rate_per_hour: "Rate_per_Hour",
      contract_max_hours_per_week: "Max_Hours_Per_Week",

      clientRules: "",
    },
  });

  const onSubmit = async (data: AuditFormValues) => {
    setSubmitError(null);
    try {
      const timesheetFile = data.timesheetFile[0];
      const billingFile = data.billingFile[0];
      const contractFile = data.contractFile[0];

      if (!timesheetFile || !billingFile || !contractFile) {
        setSubmitError("Please make sure all three CSV files are selected.");
        return;
      }

      const uploadSteps = [
        {
          stepName: "Uploading timesheet CSV...",
          file: timesheetFile,
          mutate: loadTimesheet.mutateAsync,
          params: {
            employee_id: data.ts_employee_id,
            employee_name: data.ts_employee_name,
            project: data.ts_project,
            hours_worked: data.ts_hours_worked,
          },
        },
        {
          stepName: "Uploading billing CSV...",
          file: billingFile,
          mutate: loadBilling.mutateAsync,
          params: {
            employee_id: data.bill_employee_id,
            project: data.bill_project,
            hours_billed: data.bill_hours_billed,
            rate_charged: data.bill_rate_charged,
          },
        },
        {
          stepName: "Uploading contract CSV...",
          file: contractFile,
          mutate: loadContracts.mutateAsync,
          params: {
            project: data.contract_project,
            rate_per_hour: data.contract_rate_per_hour,
            max_hours_per_week: data.contract_max_hours_per_week,
          },
        },
      ];

      for (const step of uploadSteps) {
        setLoadingStep(step.stepName);
        await step.mutate({
          file: step.file,
          params: step.params as any,
        });
      }

      setLoadingStep("Running AI Audit...");
      setSubmittedRules(data.clientRules);

      if (!shouldFetchAudit) {
        setShouldFetchAudit(true);
      } else {
        await refetchAudit();
      }
    } catch (err: any) {
      console.error(err);
      setSubmitError(err?.response?.data?.detail || err?.message || "An error occurred during file upload.");
    } finally {
      setLoadingStep(null);
    }
  };

  const isSubmitting = !!loadingStep;
  const isLoading = isSubmitting || isAuditing;

  return (
    <main className="dark bg-background text-foreground min-h-screen pb-16 selection:bg-sky-500/30 selection:text-sky-200">
      <Header />

      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <AuditForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={isLoading}
          loadingStep={loadingStep}
          submitError={submitError}
          auditError={auditError}
        />

        {isLoading ? (
          <LoadingState loadingStep={loadingStep} />
        ) : auditResult ? (
          <AuditResults auditResult={auditResult} />
        ) : (
          <EmptyState />
        )}

        <p className="text-center text-xs text-muted-foreground/70 pt-4">Built by David Santana</p>
      </div>
    </main>
  );
};
