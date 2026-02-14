"use client";

import { ProductCard } from "@/components/common/products/product-card";
import { useGetSession } from "@/hooks/use-auth";
import { getAllProductsAction } from "@/lib/actions/product-action";
import { isNewProduct } from "@/lib/lib";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const ProductsPage = () => {
  const { user } = useGetSession();
  const { data } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: () => getAllProductsAction(user?.email),
    enabled: !!user?.email,
    staleTime: 5000 * 60 * 5,
  });
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          All Products ({data?.products.length})
        </h2>
        <Link href={"/dashboard/vendor/products/create-product"}>
          <Button>
            <PlusCircle />
            Create Product
          </Button>
        </Link>
      </div>
      <Separator className="my-5" />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {data?.products.map((item) => (
          <ProductCard
            key={item.id}
            price={item.salePrice}
            title={item.title}
            image={item.images[0] || ""}
            isTrending={
              isNewProduct(item.createdAt, 15) ? "🆕 New Arrival" : "🔥 Popular"
            }
            colors={item.color}
            sellerName={item.user.name}
            sellerImage={item.user.image}
          />
        ))}
      </div>
    </div>
  );
};
