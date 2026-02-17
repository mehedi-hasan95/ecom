"use client";

import { EditDeleteCard } from "@/components/common/products/edit-delete-card";
import { deleteSubCategoryAction } from "@/lib/actions/admin/admin-action";
import { getSubCategoriesAction } from "@/lib/actions/category/category-action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";

import { Separator } from "@workspace/ui/components/separator";
import { formatDistanceToNow } from "date-fns";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const SubCategoryPage = () => {
  const { data } = useQuery({
    queryKey: ["subCategories"],
    queryFn: () => getSubCategoriesAction(""),
  });
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteSubCategoryAction,
    onMutate: async (previousSubCat) => {
      await queryClient.cancelQueries({
        queryKey: ["subCategories", previousSubCat.slug],
      });
      const previousSubCategory = queryClient.getQueryData([
        "subCategories",
        previousSubCat.slug,
      ]);
      queryClient.setQueryData(
        ["subCategories", previousSubCat.slug],
        previousSubCat,
      );
      return { previousSubCategory, previousSubCat };
    },
    onError: (err, previousSubCat, onMutateResult) => {
      queryClient.setQueryData(
        ["subCategories", onMutateResult?.previousSubCat?.slug],
        onMutateResult?.previousSubCategory,
      );
    },
    onSettled: (previousSubCat) =>
      queryClient.invalidateQueries({
        queryKey: ["subCategories", previousSubCat.slug],
      }),
  });
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Sub Categories ({data?.subCategories?.length})
        </h2>
        <Link href={"/dashboard/admin/sub-categories/create-subcategory"}>
          <Button>
            <PlusCircle /> Create Sub Category
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />
      <p>Explore all available sub categories and manage your content</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-5">
        {data?.subCategories?.map((sub) => (
          <EditDeleteCard
            key={sub.id}
            href={`/dashboard/admin/sub-categories/${sub.slug}`}
            image="https://github.com/shadcn.png"
            onDelete={() => deleteMutation.mutate({ slug: sub.slug })}
            title={sub.name}
            updateAt={formatDistanceToNow(sub.createdAt, {
              addSuffix: true,
              includeSeconds: true,
            })}
          />
        ))}
      </div>
    </>
  );
};
