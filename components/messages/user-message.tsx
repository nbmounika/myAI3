import { UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";

export function UserMessage({ message }: { message: UIMessage }) {
    return (
        <div className="whitespace-pre-wrap w-full flex justify-end animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <div className="max-w-lg w-fit px-5 py-3.5 rounded-2xl message-bubble-user backdrop-blur-sm">
                <div className="text-[15px] leading-relaxed text-slate-100">
                    {message.parts.map((part, i) => {
                        switch (part.type) {
                            case "text":
                                return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}