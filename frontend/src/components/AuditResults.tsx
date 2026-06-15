import React from "react";
import { FoundDiscrepanciesTable } from "@/components/FoundDiscrepanciesTable";
import { AiFindings } from "@/components/AiFindings";
import type { IdentifyDiscrepanciesResponse } from "@/api/identify-discrepancies/types";

interface AuditResultsProps {
  auditResult: IdentifyDiscrepanciesResponse;
}

export const AuditResults: React.FC<AuditResultsProps> = ({ auditResult }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
          <span>Audited Records</span>
          <span className="text-[10px] font-normal text-muted-foreground/85">
            ({auditResult.data.length} records)
          </span>
        </h3>
        <FoundDiscrepanciesTable data={auditResult.data} />
      </div>

      <AiFindings analysis={auditResult.analysis} />
    </div>
  );
};
