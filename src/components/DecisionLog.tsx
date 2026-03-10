"use client";

import { useState } from "react";

interface Decision {
  question: string;
  alternatives: string[];
  chosen: string;
  reasoning: string;
}

export function DecisionLog({ decisions }: { decisions: Decision[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!decisions || !Array.isArray(decisions)) {
    return null;
  }

  return (
    <div className="space-y-3 my-6">
      {decisions.map((d, i) => (
        <div key={i} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="text-sm font-medium">{d.question}</span>
            <svg
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                openIdx === i ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {openIdx === i && (
            <div className="px-4 pb-4 text-sm space-y-3 border-t border-border pt-3">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Alternatives
                </span>
                <ul className="mt-1 space-y-1">
                  {(d.alternatives || []).map((alt, j) => (
                    <li key={j} className="text-muted-foreground">
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-xs font-medium text-accent uppercase tracking-wide">
                  Chosen
                </span>
                <p className="mt-1 font-medium">{d.chosen}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Reasoning
                </span>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {d.reasoning}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
