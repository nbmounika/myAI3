// components/messages/message-wall.tsx
import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";

export function MessageWall({ 
  messages, 
  status, 
  durations, 
  onDurationChange,
  onDomainSelect,
  onTopicSelect 
}: { 
  messages: UIMessage[]; 
  status?: string; 
  durations?: Record<string, number>; 
  onDurationChange?: (key: string, duration: number) => void;
  onDomainSelect?: (domain: string) => void;
  onTopicSelect?: (topic: string) => void;
}) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="relative max-w-3xl w-full">
            <div className="relative flex flex-col gap-4">
                {messages.map((message, messageIndex) => {
                    const isLastMessage = messageIndex === messages.length - 1;
                    return (
                        <div key={message.id} className="w-full">
                            {message.role === "user" ? (
                                <UserMessage message={message} />
                            ) : (
                                <AssistantMessage 
                                    message={message} 
                                    status={status} 
                                    isLastMessage={isLastMessage} 
                                    durations={durations} 
                                    onDurationChange={onDurationChange}
                                    onDomainSelect={onDomainSelect}
                                    onTopicSelect={onTopicSelect}
                                />
                            )}
                        </div>
                    );
                })}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

// components/messages/assistant-message.tsx
import { UIMessage, ToolCallPart, ToolResultPart } from "ai";
import { Response } from "@/components/ai-elements/response";
import { ReasoningPart } from "./reasoning-part";
import { ToolCall, ToolResult } from "./tool-call";
import { ToolRenderer } from "./tool-renderer";

export function MessageWall({ 
    message, 
    status, 
    isLastMessage, 
    durations, 
    onDurationChange,
    onDomainSelect,
    onTopicSelect
}: { 
    message: UIMessage; 
    status?: string; 
    isLastMessage?: boolean; 
    durations?: Record<string, number>; 
    onDurationChange?: (key: string, duration: number) => void;
    onDomainSelect?: (domain: string) => void;
    onTopicSelect?: (topic: string) => void;
}) {
    return (
        <div className="w-full">
            <div className="text-sm flex flex-col gap-4">
                {message.parts.map((part, i) => {
                    const isStreaming = status === "streaming" && isLastMessage && i === message.parts.length - 1;
                    const durationKey = `${message.id}-${i}`;
                    const duration = durations?.[durationKey];

                    if (part.type === "text") {
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
                            const toolResultPart = part as unknown as ToolResultPart;
                            
                            // Check if this is a selector tool
                            if (toolResultPart.toolName === "showDomainSelector" || toolResultPart.toolName === "showTopicSelector") {
                                return (
                                    <ToolRenderer
                                        key={`${message.id}-${i}`}
                                        part={toolResultPart}
                                        onDomainSelect={onDomainSelect || (() => {})}
                                        onTopicSelect={onTopicSelect || (() => {})}
                                    />
                                );
                            }
                            
                            return (
                                <ToolResult
                                    key={`${message.id}-${i}`}
                                    part={toolResultPart}
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
    )
}
