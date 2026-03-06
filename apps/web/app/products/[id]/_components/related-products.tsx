"use client";

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";

interface RelatedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
}

interface RelatedProductsProps {
  currentProductId: string;
}

const mockRelatedProducts: RelatedProduct[] = [
  {
    id: "2",
    title: "Wireless Earbuds Pro Max",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.6,
    reviews: 256,
    discount: 23,
  },
  {
    id: "3",
    title: "Studio Monitor Headphones",
    image:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&q=80",
    price: 179.99,
    originalPrice: 229.99,
    rating: 4.8,
    reviews: 142,
    discount: 22,
  },
  {
    id: "4",
    title: "Portable Bluetooth Speaker",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 189,
    discount: 25,
  },
  {
    id: "5",
    title: "Noise Cancelling Earphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviews: 278,
    discount: 24,
  },
];

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  return (
    <section className="mt-16 space-y-8 border-t border-border pt-12">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          You Might Also Like
        </h2>
        <p className="text-muted-foreground mt-1">
          Related audio products from our collection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockRelatedProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-lg border border-border overflow-hidden hover:border-primary/50 transition cursor-pointer"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <Badge variant="destructive" className="absolute top-3 right-3">
                -{product.discount}%
              </Badge>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>

              {/* Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("[v0] Quick add:", product.id);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
