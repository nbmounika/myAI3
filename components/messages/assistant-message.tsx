import { UIMessage, ToolCallPart, ToolResultPart } from "ai";
import { Response } from "@/components/ai-elements/response";
import { ReasoningPart } from "./reasoning-part";
import { ToolCall, ToolResult } from "./tool-call";
import { DomainTopicSelector } from "@/components/ai-elements/domain-topic-selector";
import { MCQQuestion, MCQQuestionData } from "@/components/ai-elements/mcq-question";
import { FeedbackDashboard, PerformanceMetrics } from "@/components/ai-elements/feedback-dashboard";
import { useChat } from "@ai-sdk/react";

interface DomainTopicJSON {
  type: "domain_topic_selector";
  domains: string[];
  topics: string[];
}

interface MCQJSON extends MCQQuestionData {
  type: "mcq";
}

interface FeedbackJSON {
  type: "feedback";
  metrics: PerformanceMetrics;
}

function tryParseDomainTopic(text: string): DomainTopicJSON | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed.type === "domain_topic_selector" && Array.isArray(parsed.domains)) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function tryParseMCQ(text: string): MCQJSON | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed.type === "mcq" && parsed.question && Array.isArray(parsed.options)) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

function tryParseFeedback(text: string): FeedbackJSON | null {
  try {
    const parsed = JSON.parse(text);
    if (parsed.type === "feedback" && parsed.metrics) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}

export function AssistantMessage({ message, status, isLastMessage, durations, onDurationChange }: { message: UIMessage; status?: string; isLastMessage?: boolean; durations?: Record<string, number>; onDurationChange?: (key: string, duration: number) => void }) {
    const { sendMessage } = useChat();

    return (
        <div className="w-full animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="text-[15px] leading-relaxed flex flex-col gap-4 text-slate-200">
                {message.parts.map((part, i) => {
                    const isStreaming = status === "streaming" && isLastMessage && i === message.parts.length - 1;
                    const durationKey = `${message.id}-${i}`;
                    const duration = durations?.[durationKey];

                    if (part.type === "text") {
                        const domainTopic = tryParseDomainTopic(part.text);
                        if (domainTopic) {
                            return (
                                <DomainTopicSelector
                                    key={`${message.id}-${i}`}
                                    domains={domainTopic.domains}
                                    topics={domainTopic.topics}
                                    onSubmit={(domain, topic) => {
                                        sendMessage({ text: `Domain: ${domain}, Topic: ${topic}` });
                                    }}
                                />
                            );
                        }

                        const mcq = tryParseMCQ(part.text);
                        if (mcq) {
                            return (
                                <MCQQuestion
                                    key={`${message.id}-${i}`}
                                    data={mcq}
                                    onSubmit={(selectedOptionId) => {
                                        const selectedOption = mcq.options.find(opt => opt.id === selectedOptionId);
                                        sendMessage({ text: `I choose: ${selectedOption?.text}` });
                                    }}
                                />
                            );
                        }

                        const feedback = tryParseFeedback(part.text);
                        if (feedback) {
                            return (
                                <FeedbackDashboard
                                    key={`${message.id}-${i}`}
                                    metrics={feedback.metrics}
                                />
                            );
                        }

                        return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                    } else if (part.type === "reasoning") {
                        return (
                            <ReasoningPart
                                key={`${message.id}-${i}`}
                                part={part}
                                isStreaming={isStreaming}
                                duration={duration}
                                onDurationChange={onDurationChange ? (d) => onDurationChange(durationKey, d) : undefined}
                            />
                        );
                    } else if (
                        part.type.startsWith("tool-") || part.type === "dynamic-tool"
                    ) {
                        if ("state" in part && part.state === "output-available") {
                            return (
                                <ToolResult
                                    key={`${message.id}-${i}`}
                                    part={part as unknown as ToolResultPart}
                                />
                            );
                        } else {
                            return (
                                <ToolCall
                                    key={`${message.id}-${i}`}
                                    part={part as unknown as ToolCallPart}
                                />
                            );
                        }
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
