import { tool } from "ai";
import { z } from "zod";

export const tools = {
  showDomainSelector: tool({
    description: "Display a dropdown menu for the user to select their interview domain. Use this when starting an interview or when the user wants to change their domain.",
    parameters: z.object({
      message: z.string().optional().describe("Optional message to display above the domain selector"),
    }),
    execute: async ({ message }) => {
      return {
        type: "domain-selector",
        message: message || "Please select a domain for your mock interview:",
      };
    },
  }),

  showTopicSelector: tool({
    description: "Display a dropdown menu for the user to select a specific topic within their chosen domain. Use this after domain selection or when the user wants to change their topic.",
    parameters: z.object({
      topics: z.array(z.string()).describe("List of available topics for the selected domain. Always include 'Generic' as the first option."),
      message: z.string().optional().describe("Optional message to display above the topic selector"),
    }),
    execute: async ({ topics, message }) => {
      return {
        type: "topic-selector",
        topics,
        message: message || "Please select a topic within this domain:",
      };
    },
  }),
};

export type ToolResults = {
  type: "domain-selector" | "topic-selector";
  message: string;
  topics?: string[];
};
