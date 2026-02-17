import { Loader2Icon, LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function SpinnerCustom({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={cn("size-6 animate-spin", className)}
        {...props}
      />
    </div>
  );
}

function SpinnerOnly({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      {...props}
    />
  );
}
export { Spinner, SpinnerCustom, SpinnerOnly };
