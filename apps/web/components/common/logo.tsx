import { cn } from "@workspace/ui/lib/utils";
import { Store } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}
export const Logo = ({ className }: Props) => {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Store className="w-5 h-5 text-primary-foreground" />
      </div>
      <span
        className={cn(
          "text-xl font-bold text-foreground hidden sm:inline",
          className,
        )}
      >
        MultiMart
      </span>
    </Link>
  );
};
