"use client";

import { Button } from "@/components/ui/button";
import { Zap, BookOpen } from "lucide-react";

interface InterviewSwitcherProps {
  currentType: "cv" | "domain";
  onSwitchToCVBased: () => void;
  onSwitchToDomainBased: () => void;
}

export function InterviewSwitcher({
  currentType,
  onSwitchToCVBased,
  onSwitchToDomainBased,
}: InterviewSwitcherProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onSwitchToCVBased}
        disabled={currentType === "cv"}
        variant="ghost"
        size="sm"
        className={`text-xs transition-all duration-200 ${
          currentType === "cv"
            ? "bg-sky-500/20 text-sky-300 border border-sky-400/30 cursor-default"
            : "hover:bg-sky-500/10 text-slate-300 hover:text-sky-300 border border-slate-600/30 hover:border-sky-400/30"
        }`}
      >
        <Zap className="size-3 mr-1" />
        CV-Based
      </Button>
      <Button
        onClick={onSwitchToDomainBased}
        disabled={currentType === "domain"}
        variant="ghost"
        size="sm"
        className={`text-xs transition-all duration-200 ${
          currentType === "domain"
            ? "bg-orange-500/20 text-orange-300 border border-orange-400/30 cursor-default"
            : "hover:bg-orange-500/10 text-slate-300 hover:text-orange-300 border border-slate-600/30 hover:border-orange-400/30"
        }`}
      >
        <BookOpen className="size-3 mr-1" />
        Domain-Based
      </Button>
    </div>
  );
}
