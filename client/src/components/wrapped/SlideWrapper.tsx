import type { ReactNode } from "react";

interface SlideWrapperProps {
  children: ReactNode;
  className?: string;
}

export function SlideWrapper({ children, className = "" }: SlideWrapperProps) {
  return (
    <div
      className={`flex-[0_0_100%] min-w-0 flex items-center justify-center p-4 ${className}`}
    >
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        {children}
      </div>
    </div>
  );
}
