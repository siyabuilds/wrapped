import type { ReactNode } from "react";

interface SlideWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SlideWrapper({ children, className = "" }: SlideWrapperProps) {
  return (
    <div
      className={`flex-[0_0_100%] min-w-0 px-1 py-2 sm:px-2 sm:py-3 animate-in fade-in slide-in-from-bottom-8 duration-500 [&>*]:min-h-[72dvh] [&>*]:rounded-[1.4rem] sm:[&>*]:min-h-[640px] sm:[&>*]:rounded-[1.8rem] ${className}`}
    >
      {children}
    </div>
  );
}
