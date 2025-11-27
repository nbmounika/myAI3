"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface DomainTopicSelectorProps {
  domains: string[];
  topics: string[];
  onSubmit: (domain: string, topic: string) => void;
}

export function DomainTopicSelector({
  domains,
  topics,
  onSubmit,
}: DomainTopicSelectorProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [hasSelectedDomain, setHasSelectedDomain] = useState(false);

  const handleDomainChange = (value: string) => {
    setSelectedDomain(value);
    setSelectedTopic("");
    setHasSelectedDomain(true);
  };

  const handleSubmit = () => {
    if (selectedDomain && selectedTopic) {
      onSubmit(selectedDomain, selectedTopic);
      setSelectedDomain("");
      setSelectedTopic("");
      setHasSelectedDomain(false);
    }
  };

  const isComplete = selectedDomain && selectedTopic;

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Container with glassmorphic effect */}
      <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-1">
            Select Your Interview Path
          </h3>
          <p className="text-sm text-slate-400">
            Choose a domain and topic to get started
          </p>
        </div>

        {/* Content Grid */}
        <div className="space-y-4">
          {/* Domain Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              <span className="inline-flex items-center gap-2">
                <span className="text-sky-400">Domain</span>
              </span>
            </label>
            <div className="relative">
              <Select value={selectedDomain} onValueChange={handleDomainChange}>
                <SelectTrigger
                  className="w-full h-10 bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/40 text-slate-100 placeholder-slate-500 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-sky-400/50 focus:border-sky-400/50 focus:bg-slate-700/50"
                >
                  <SelectValue placeholder="Select a domain..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 rounded-lg">
                  {domains.map((domain) => (
                    <SelectItem
                      key={domain}
                      value={domain}
                      className="hover:bg-sky-500/20 focus:bg-sky-500/20 text-slate-100 cursor-pointer"
                    >
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDomain && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
              )}
            </div>
          </div>

          {/* Topic Selector - Only show when domain is selected */}
          {hasSelectedDomain && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
              <label className="block text-sm font-medium text-slate-200 mb-2">
                <span className="inline-flex items-center gap-2">
                  <span className="text-orange-400">Topic</span>
                </span>
              </label>
              <div className="relative">
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger
                    className="w-full h-10 bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-700/40 text-slate-100 placeholder-slate-500 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 focus:bg-slate-700/50"
                  >
                    <SelectValue placeholder="Select a topic..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 rounded-lg">
                    {topics.map((topic) => (
                      <SelectItem
                        key={topic}
                        value={topic}
                        className="hover:bg-orange-500/20 focus:bg-orange-500/20 text-slate-100 cursor-pointer"
                      >
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedTopic && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-400 rounded-full" />
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {hasSelectedDomain && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`w-full h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  isComplete
                    ? "bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                    : "bg-slate-700/30 text-slate-400 cursor-not-allowed"
                }`}
              >
                <Zap className="size-4" />
                Start Interview
              </Button>
            </div>
          )}
        </div>

        {/* Info message */}
        {!hasSelectedDomain && (
          <div className="mt-4 p-3 bg-sky-400/10 border border-sky-400/20 rounded-lg">
            <p className="text-xs text-sky-300">
              💡 Select a domain to explore available topics for your interview
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
