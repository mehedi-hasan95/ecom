"use client";

import { fromatPrice } from "@/lib/lib";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Trash2, Edit2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  name: string;
  category: string;
  subCategory: string;
  price: number;
  color: string[];
  image: string;
  onDelete?: () => void;
  onEdit: string;
}

export const ProductEditDeleteCard = ({
  category,
  color,
  image,
  name,
  onEdit,
  price,
  subCategory,
  onDelete,
}: Product) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg hover:scale-105">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gradient-to-br from-muted to-muted/50 dark:from-muted dark:to-muted/70 flex items-center justify-center overflow-hidden group">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          height={500}
          width={500}
        />

        {/* Color Badge */}
        {color.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-background/90 dark:bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
            <div className="flex gap-2 items-center flex-wrap">
              {color.map((item) => (
                <div
                  key={item}
                  className="w-4 h-4 rounded-full border-2 border-foreground/30"
                  style={{ backgroundColor: item }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        {/* Category Tags */}
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary border border-primary/20">
            {category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 dark:bg-secondary/20 border border-secondary/20">
            {subCategory}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-lg truncate">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-primary">
            {fromatPrice(price)}
          </span>
          <span className="text-xs text-muted-foreground">USD</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={onEdit}>
            <Button variant={"link"}>
              <Edit2 size={16} />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </Link>
          <Button
            onClick={onDelete}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20 hover:border-destructive/50"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};
