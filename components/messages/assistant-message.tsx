"use client";

import { UIMessage, ToolCallPart, ToolResultPart } from "ai";
import { Response } from "@/components/ai-elements/response";
import { ReasoningPart } from "./reasoning-part";
import { ToolCall, ToolResult } from "./tool-call";
import DomainTopicSelector from "@/components/DomainTopicSelector"; // ensure path is correct
import React from "react";

export function AssistantMessage({
  message,
  status,
  isLastMessage,
  durations,
  onDurationChange,
}: {
  message: UIMessage;
  status?: string;
  isLastMessage?: boolean;
  durations?: Record<string, number>;
  onDurationChange?: (key: string, duration: number) => void;
}) {
  return (
    <div className="w-full">
      <div className="text-sm flex flex-col gap-4">
        {message.parts.map((part, i) => {
          const isStreaming =
            status === "streaming" && isLastMessage && i === message.parts.length - 1;
          const durationKey = `${message.id}-${i}`;
          const duration = durations?.[durationKey];

          if (part.type === "text") {
            // Try to parse JSON. If parsing fails, render as plain text.
            let parsed: any = null;
            try {
              parsed = JSON.parse(part.text);
            } catch (err) {
              parsed = null;
            }

            // If the assistant sent the domain/topic selector JSON, render the interactive dropdowns
            if (parsed && parsed.type === "domain_topic_selector") {
              // Ensure topics is an array; some messages may put "DYNAMICALLY_POPULATED"
              let topicsArray: string[] = [];
              if (Array.isArray(parsed.topics)) {
                topicsArray = parsed.topics;
              } else if (parsed.topics && parsed.topics === "DYNAMICALLY_POPULATED") {
                // If the assistant only signalled dynamic population, render empty topics for now.
                topicsArray = [];
              }

              const domainsArray: string[] = Array.isArray(parsed.domains) ? parsed.domains : [];

              return (
                <div key={`${message.id}-${i}`} className="my-2">
                  <Response>
                    Please select a domain to begin your mock interview:
                  </Response>

                  <DomainTopicSelector
                    key={`${message.id}-${i}-selector`}
                    data={{
                      domains: domainsArray,
                      topics: topicsArray,
                    }}
                    onSelect={(selection: any) => {
                      // Compose a user-visible selection message and dispatch it as a browser event.
                      // The event is caught by the chat input to actually send the message to the model.
                      const userMessage = selection.topic
                        ? `I choose topic: ${selection.topic}`
                        : `I choose domain: ${selection.domain}`;

                      // Dispatch the custom event with the selected message.
                      const ev = new CustomEvent("send-message", {
                        detail: { message: userMessage },
                      });
                      window.dispatchEvent(ev);
                    }}
                  />
                </div>
              );
            }

            // Fallback: regular assistant text
            return (
              <Response key={`${message.id}-${i}`}>
                {part.text}
              </Response>
            );
          } else if (part.type === "reasoning") {
            return (
              <ReasoningPart
                key={`${message.id}-${i}`}
                part={part}
                isStreaming={isStreaming}
                duration={duration}
                onDurationChange={
                  onDurationChange ? (d) => onDurationChange(durationKey, d) : undefined
                }
              />
            );
          } else if (part.type.startsWith("tool-") || part.type === "dynamic-tool") {
            if ("state" in part && part.state === "output-available") {
              return <ToolResult key={`${message.id}-${i}`} part={part as unknown as ToolResultPart} />;
            } else {
              return <ToolCall key={`${message.id}-${i}`} part={part as unknown as ToolCallPart} />;
            }
          }
          return null;
        })}
      </div>
    </div>
  );
}
