import { Card } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const CategoryPageLoading = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-7 w-48" />
      </div>
      <Separator className="my-4" />
      <div className="space-y-3">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-4 w-56" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="h-20 aspect-video" />
                </div>
                <Skeleton className="h-6 w-12" />
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-28" />
                  </div>

                  {/* CTA Button */}
                  <Skeleton className="h-6 w-10" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
