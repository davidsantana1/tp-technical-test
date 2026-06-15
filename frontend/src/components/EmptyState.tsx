import { FileSearch } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-border/80 bg-card/10 backdrop-blur-md text-center border-dashed">
      <FileSearch className="w-10 h-10 mb-2" />
      <h3 className="text-sm font-bold text-foreground">No Audits Run Yet</h3>
      <p className="text-muted-foreground text-xs max-w-sm mt-1 leading-relaxed">
        Upload your files and click "Run Audits" to load datasets and scan them for anomalies.
      </p>
    </div>
  );
};
