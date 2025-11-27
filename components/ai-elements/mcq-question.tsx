"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";

export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQQuestionData {
  type: "mcq";
  questionId: string;
  question: string;
  options: MCQOption[];
}

interface MCQQuestionProps {
  data: MCQQuestionData;
  onSubmit: (selectedOptionId: string) => void;
  isSubmitting?: boolean;
}

export function MCQQuestion({
  data,
  onSubmit,
  isSubmitting = false,
}: MCQQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSubmit = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
      setSelectedOption("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-100">
            {data.question}
          </h3>
        </div>

        {/* Options */}
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          <div className="space-y-3">
            {data.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedOption === option.id
                    ? "bg-sky-500/20 border-sky-400/50"
                    : "bg-slate-700/20 border-slate-600/30 hover:border-slate-500/50 hover:bg-slate-700/30"
                }`}
                onClick={() => setSelectedOption(option.id)}
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className="border-2 border-slate-500"
                />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-slate-100 font-normal"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption || isSubmitting}
            className={`w-full h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedOption && !isSubmitting
                ? "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                : "bg-slate-700/30 text-slate-400 cursor-not-allowed"
            }`}
          >
            <ArrowRight className="size-4" />
            Submit Answer
          </Button>
        </div>
      </div>
    </div>
  );
}
