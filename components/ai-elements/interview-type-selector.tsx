"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, BookOpen } from "lucide-react";

interface InterviewTypeSelectorProps {
  onSelectCVBased: () => void;
  onSelectDomainBased: () => void;
}

export function InterviewTypeSelector({
  onSelectCVBased,
  onSelectDomainBased,
}: InterviewTypeSelectorProps) {
  const [isHovered, setIsHovered] = useState<"cv" | "domain" | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Main container */}
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-100 mb-2">
            Choose Your Interview Type
          </h3>
          <p className="text-sm text-slate-400">
            Select how you'd like to prepare for your interview
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CV-Based Interview Option */}
          <button
            onClick={onSelectCVBased}
            onMouseEnter={() => setIsHovered("cv")}
            onMouseLeave={() => setIsHovered(null)}
            className="relative group"
          >
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                isHovered === "cv"
                  ? "bg-sky-500/20 border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  : "bg-slate-700/20 border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isHovered === "cv"
                      ? "bg-sky-400/20"
                      : "bg-slate-600/30"
                  }`}
                >
                  <FileUp
                    className={`size-6 transition-colors duration-300 ${
                      isHovered === "cv" ? "text-sky-400" : "text-slate-300"
                    }`}
                  />
                </div>
                <div className="text-left">
                  <h4
                    className={`font-semibold transition-colors duration-300 ${
                      isHovered === "cv" ? "text-sky-300" : "text-slate-100"
                    }`}
                  >
                    CV-Based Interview
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Upload your CV and get personalized questions
                  </p>
                </div>
              </div>
            </div>
          </button>

          {/* Domain-Specific Interview Option */}
          <button
            onClick={onSelectDomainBased}
            onMouseEnter={() => setIsHovered("domain")}
            onMouseLeave={() => setIsHovered(null)}
            className="relative group"
          >
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                isHovered === "domain"
                  ? "bg-orange-500/20 border-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                  : "bg-slate-700/20 border-slate-600/30 hover:border-slate-500/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    isHovered === "domain"
                      ? "bg-orange-400/20"
                      : "bg-slate-600/30"
                  }`}
                >
                  <BookOpen
                    className={`size-6 transition-colors duration-300 ${
                      isHovered === "domain" ? "text-orange-400" : "text-slate-300"
                    }`}
                  />
                </div>
                <div className="text-left">
                  <h4
                    className={`font-semibold transition-colors duration-300 ${
                      isHovered === "domain" ? "text-orange-300" : "text-slate-100"
                    }`}
                  >
                    Domain-Specific Interview
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Choose a domain and topic from available options
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Info message */}
        <div className="mt-6 p-3 bg-violet-400/10 border border-violet-400/20 rounded-lg">
          <p className="text-xs text-violet-300">
            💡 You can switch between interview types anytime during the conversation
          </p>
        </div>
      </div>
    </div>
  );
}
