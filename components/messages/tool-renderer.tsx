import { ToolResultPart } from "ai";
import { DomainSelector, TopicSelector } from "@/components/interview/selector";

interface ToolRendererProps {
  part: ToolResultPart;
  onDomainSelect: (domain: string) => void;
  onTopicSelect: (topic: string) => void;
}

export function ToolRenderer({ part, onDomainSelect, onTopicSelect }: ToolRendererProps) {
  const output = part.output as any;

  if (!output || typeof output !== "object") {
    return null;
  }

  switch (output.type) {
    case "domain-selector":
      return (
        <div className="w-full flex flex-col gap-2">
          {output.message && (
            <p className="text-sm text-muted-foreground">{output.message}</p>
          )}
          <DomainSelector onSelect={onDomainSelect} />
        </div>
      );

    case "topic-selector":
      return (
        <div className="w-full flex flex-col gap-2">
          {output.message && (
            <p className="text-sm text-muted-foreground">{output.message}</p>
          )}
          <TopicSelector 
            topics={output.topics || []} 
            onSelect={onTopicSelect} 
          />
        </div>
      );

    default:
      return null;
  }
}

// Usage example in your AssistantMessage component:
// 
// import { ToolRenderer } from "./tool-renderer";
// 
// export function AssistantMessage({ message, onDomainSelect, onTopicSelect, ... }) {
//   return (
//     <div className="w-full">
//       <div className="text-sm flex flex-col gap-4">
//         {message.parts.map((part, i) => {
//           if (part.type === "text") {
//             return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
//           } else if (part.type.startsWith("tool-") && "state" in part && part.state === "output-available") {
//             return (
//               <ToolRenderer
//                 key={`${message.id}-${i}`}
//                 part={part}
//                 onDomainSelect={onDomainSelect}
//                 onTopicSelect={onTopicSelect}
//               />
//             );
//           }
//           // ... rest of your logic
//         })}
//       </div>
//     </div>
//   );
// }
