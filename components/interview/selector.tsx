import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface DomainSelectorProps {
  onSelect: (domain: string) => void;
}

export function DomainSelector({ onSelect }: DomainSelectorProps) {
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  const domains = [
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations & General Management" },
    { value: "consulting", label: "Consulting" },
  ];

  const handleConfirm = () => {
    if (selectedDomain) {
      onSelect(selectedDomain);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lg">Select Domain</CardTitle>
        <CardDescription>
          Choose the domain for your mock interview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedDomain} onValueChange={setSelectedDomain}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a domain" />
          </SelectTrigger>
          <SelectContent>
            {domains.map((domain) => (
              <SelectItem key={domain.value} value={domain.value}>
                {domain.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedDomain}
          className="w-full"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}

export interface TopicSelectorProps {
  topics: string[];
  onSelect: (topic: string) => void;
}

export function TopicSelector({ topics, onSelect }: TopicSelectorProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleConfirm = () => {
    if (selectedTopic) {
      onSelect(selectedTopic);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-neutral-200">
      <CardHeader>
        <CardTitle className="text-lg">Select Topic</CardTitle>
        <CardDescription>
          Choose a specific topic or select Generic for general questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleConfirm} 
          disabled={!selectedTopic}
          className="w-full"
        >
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  );
}
