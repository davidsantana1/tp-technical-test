import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  loadingStep: string | null;
}

export const LoadingState = ({ loadingStep }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 rounded-xl border border-border bg-card/25 backdrop-blur-md min-h-[160px] shadow-sm">
      <Loader2 className="w-8 h-8 animate-spin text-sky-500 mb-2" />
      <p className="text-muted-foreground text-xs">
        {loadingStep || "Claude is processing your dataset..."}
      </p>
    </div>
  );
};
