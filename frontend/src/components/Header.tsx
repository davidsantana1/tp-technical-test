import React from "react";
import { ClipboardCheck } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <div className="border-b border-border bg-card/20 backdrop-blur-xs py-4 px-6 mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-sky-400" />
          <h1 className="text-lg font-bold tracking-tight text-white font-sans">
            Timesheet & Billing Auditor
          </h1>
        </div>
        <span className="text-xs bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full border border-border">
          Powered by Claude AI
        </span>
      </div>
    </div>
  );
};
