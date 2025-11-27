import { cn } from "@/lib/utils";

export function ChatHeaderBlock({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={cn("gap-3 flex flex-1 items-center", className)}>
            {children}
        </div>
    )
}

export function ChatHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex justify-center py-4 px-5">
            <div className="w-full max-w-3xl flex items-center floating-header rounded-2xl px-5 py-3">
                {children}
            </div>
        </div>
    )
}