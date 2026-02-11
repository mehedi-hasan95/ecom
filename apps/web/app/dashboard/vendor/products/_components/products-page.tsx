"use client";

import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const ProductsPage = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All Products (10)</h2>
        <Link href={"/dashboard/vendor/products/create-product"}>
          <Button>
            <PlusCircle />
            Create Product
          </Button>
        </Link>
      </div>
      <Separator className="my-5" />
    </div>
  );
};
