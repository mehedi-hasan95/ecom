import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  title?: string;
  className?: string;
}
export const LoadingButton = ({ className, title = "Loading..." }: Props) => {
  return (
    <Button className={cn(className)}>
      {title}
      <Loader2 className="animate-spin" />
    </Button>
  );
};
