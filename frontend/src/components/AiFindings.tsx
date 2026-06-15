import React from "react";
import { marked } from "marked";
import { Card, CardContent } from "@/components/ui/card";
import type { Analysis } from "@/api/identify-discrepancies/types";

interface AiFindingsProps {
  analysis: Analysis[];
}

export const AiFindings: React.FC<AiFindingsProps> = ({ analysis }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
        <span>AI Insights & Findings</span>
        <span className="text-[10px] font-normal text-sky-400 bg-sky-500/10 px-1.5 py-0.2 rounded">
          Analysis Report
        </span>
      </h3>
      <Card className="border border-border bg-card/40 backdrop-blur-md shadow-sm">
        <CardContent className="px-4 py-0 text-xs markdown-content">
          {analysis && analysis.length > 0 ? (
            <div className="space-y-3">
              {analysis.map((block, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: marked.parse(block.text) as string }}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-xs italic">No text explanation returned from AI.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
