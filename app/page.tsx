"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useChat } from "ai/react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MessageWall } from "@/components/messages/message-wall";
import { ChatHeader, ChatHeaderBlock } from "@/app/parts/chat-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UIMessage } from "ai";

import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";

const formSchema = z.object({
  message: z.string().min(1).max(2000),
});

const STORAGE_KEY = 'chat-messages';

type StorageData = {
  messages: UIMessage[];
  durations: Record<string, number>;
};

const loadMessages = () => {
  if (typeof window === "undefined") return { messages: [], durations: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { messages: [], durations: {} };
    return JSON.parse(stored);
  } catch {
    return { messages: [], durations: {} };
  }
};

const saveMessages = (messages: UIMessage[], durations: Record<string, number>) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, durations }));
};

export default function ChatPage() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeShown = useRef(false);

  // Load messages from localStorage
  const stored = typeof window !== "undefined" ? loadMessages() : { messages: [], durations: {} };
  const [initialMessages] = useState<UIMessage[]>(stored.messages);

  // useChat from AI SDK
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    append,
    isLoading,
    setMessages,
    stop,
  } = useChat({
    api: "/api/chat",
    messages: initialMessages,
    experimental_toolCallMode: "manual",
  });

  // Store durations loaded from localStorage
  useEffect(() => {
    setIsClient(true);
    setDurations(stored.durations);
    setMessages(stored.messages);
  }, []);

  // Save on changes
  useEffect(() => {
    if (isClient) saveMessages(messages, durations);
  }, [messages, durations, isClient]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [key]: duration }));
  };

  // Show welcome message only when chat is empty
  useEffect(() => {
    if (isClient && initialMessages.length === 0 && !welcomeShown.current) {
      const welcome: UIMessage = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        parts: [{ type: "text", text: WELCOME_MESSAGE }],
      };
      setMessages([welcome]);
      saveMessages([welcome], {});
      welcomeShown.current = true;
    }
  }, [isClient, initialMessages.length, setMessages]);

  // Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const onSend = (data: any) => {
    append({ role: "user", content: data.message });
    form.reset();
  };

  const clearChat = () => {
    setMessages([]);
    setDurations({});
    saveMessages([], {});
    toast.success("Chat cleared");
  };

  // 🔥 Listen for dropdown/domain/topic selection events (send-message)
  useEffect(() => {
    const handler = (e: any) => {
      const messageText = e.detail?.message;
      if (!messageText) return;

      append({ role: "user", content: messageText });
    };

    window.addEventListener("send-message", handler);
    return () => window.removeEventListener("send-message", handler);
  }, [append]);

  return (
    <div className="flex h-screen items-center justify-center font-sans dark:bg-black">
      <main className="w-full dark:bg-black h-screen relative">

        {/* HEADER */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-linear-to-b from-background via-background/50 to-transparent pb-16 dark:bg-black">
          <ChatHeader>
            <ChatHeaderBlock />
            <ChatHeaderBlock className="justify-center items-center">
              <Avatar className="size-8 ring-1 ring-primary">
                <AvatarImage src="/logo.png" />
                <AvatarFallback>
                  <Image src="/logo.png" width={36} height={36} alt="Logo" />
                </AvatarFallback>
              </Avatar>
              <p className="tracking-tight">Chat with {AI_NAME}</p>
            </ChatHeaderBlock>

            <ChatHeaderBlock className="justify-end">
              <Button variant="outline" size="sm" onClick={clearChat}>
                <Plus className="size-4" />
                {CLEAR_CHAT_TEXT}
              </Button>
            </ChatHeaderBlock>
          </ChatHeader>
        </div>

        {/* MESSAGE WALL */}
        <div className="h-screen overflow-y-auto px-5 py-4 pt-[88px] pb-[150px] w-full">
          <div className="flex flex-col items-center justify-end min-h-full">
            {isClient ? (
              <>
                <MessageWall
                  messages={messages}
                  status={isLoading ? "streaming" : "idle"}
                  durations={durations}
                  onDurationChange={handleDurationChange}
                />
                {isLoading && (
                  <div className="flex justify-start max-w-3xl w-full">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </>
            ) : (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-linear-to-t from-background via-background/50 to-transparent dark:bg-black pt-13">
          <div className="w-full px-5 pt-5 pb-1 flex justify-center">
            <div className="max-w-3xl w-full">

              <form onSubmit={form.handleSubmit(onSend)}>
                <FieldGroup>
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className="sr-only">Message</FieldLabel>
                        <div className="relative h-13">
                          <Input
                            {...field}
                            placeholder="Type your message here..."
                            className="h-15 pr-15 pl-5 bg-card rounded-[20px]"
                            disabled={isLoading}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSend)();
                              }
                            }}
                          />

                          {!isLoading && (
                            <Button
                              type="submit"
                              size="icon"
                              className="absolute right-3 top-3 rounded-full"
                              disabled={!field.value.trim()}
                            >
                              <ArrowUp className="size-4" />
                            </Button>
                          )}

                          {isLoading && (
                            <Button
                              size="icon"
                              className="absolute right-2 top-2 rounded-full"
                              onClick={stop}
                            >
                              <Square className="size-4" />
                            </Button>
                          )}
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>

            </div>
          </div>

          {/* FOOTER */}
          <div className="w-full flex justify-center text-xs text-muted-foreground py-3">
            © {new Date().getFullYear()} {OWNER_NAME} —
            <Link href="/terms" className="underline ml-1 mr-1">
              Terms of Use
            </Link>
            Powered by <Link href="https://ringel.ai/" className="underline ml-1">Ringel.AI</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
