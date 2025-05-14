// components/ui/LoadingSpinner.tsx

import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export default function LoadingSpinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Loader2
      className={cn("animate-spin text-gray-500", sizeClasses[size])}
      aria-label="Loading"
    />
  );
}
