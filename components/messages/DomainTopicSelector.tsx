"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DomainTopicSelector({ data, onSelect }: any) {
  const { domains, topics } = data;

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  return (
    <div className="flex gap-6 mt-4">
      {/* Domain Dropdown */}
      <div className="w-1/2">
        <Select
          onValueChange={(value) => {
            setSelectedDomain(value);
            onSelect({ domain: value, topic: null });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Domain" />
          </SelectTrigger>
          <SelectContent>
            {domains.map((d: string) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Topic Dropdown */}
      <div className="w-1/2">
        <Select
          onValueChange={(value) => {
            setSelectedTopic(value);
            onSelect({ domain: selectedDomain, topic: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((t: string) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
