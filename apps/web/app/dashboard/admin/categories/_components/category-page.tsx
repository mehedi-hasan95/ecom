"use client";
import { getCategoriesAction } from "@/lib/actions/category/category-action";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Separator } from "@workspace/ui/components/separator";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategoryPageLoading } from "./category-page-loading";

export const CategoryPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });
  if (isLoading) {
    return <CategoryPageLoading />;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All categories</h2>
        <Link href={"/dashboard/admin/categories/create-category"}>
          <Button>Create Category</Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <div className="">
        <h2 className="text-2xl font-bold">
          Categories ({data?.categories?.length})
        </h2>
        <p>Explore all available categories and manage your content</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-5">
          {data?.categories?.map((category) => (
            <Card
              className="group relative overflow-hidden bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full"
              key={category.id}
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br `}
              />
              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  {/* todo: add image  */}
                  <Image
                    src={category.image || "https://github.com/shadcn.png"}
                    alt={category.name}
                    height={60}
                    width={60}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-card border-border"
                    >
                      <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-muted text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Items
                      </p>
                      <p className="text-2xl font-bold text-primary">48</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Updated
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatDistanceToNow(category.updatedAt, {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full transition-all duration-200 hover:bg-primary bg-muted/50 text-white`}
                  >
                    View Category
                    <ArrowRight
                      className={`w-4 h-4 ml-2 transition-transform hover:translate-x-1`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
