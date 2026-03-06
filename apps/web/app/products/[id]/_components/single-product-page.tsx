"use client";

import { useState } from "react";
import { ShoppingCart, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { ProductGallery } from "./product-gallery";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import ProductSpecs from "./product-specs";
import ReviewsSection from "./reviews-section";
import RelatedProducts from "./related-products";
import { useQuery } from "@tanstack/react-query";
import { getSingleProductAction } from "@/lib/actions/product-action";
import { NotFound } from "@/components/common/not-found";
import { WishlistButton } from "@/components/common/products/wishlist-button";
import { useWishlistData } from "@/hooks/use-wishlist";
import { HtmlParser } from "@/components/common/html-parser";
import { fromatPrice } from "@/lib/lib";

const mockProduct = {
  id: "1",
  title: "Premium Wireless Headphones Pro",
  shortDescription:
    "Professional-grade wireless headphones with active noise cancellation",
  basePrice: 199.99,
  salePrice: 149.99,
  stock: 47,
  tags: ["audio", "wireless", "noise-cancelling", "professional"],
  weight: 0.25,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1000&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1000&q=80",
  ],
  color: ["Black", "Silver", "Navy Blue"],
  sizes: [],

  cashOnDelivery: true,
  cupon: "WELCOME20",
  status: "active",
  categorySlug: "electronics",
  subCategorySlug: "audio",
  userEmail: "seller@example.com",
  rating: 4.7,
  reviewCount: 328,
};

interface Props {
  id: string;
}
export const SingleProductPage = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getSingleProductAction(id),
    staleTime: 5000 * 60 * 5,
  });
  const [selectedColor, setSelectedColor] = useState(data?.color[0]);
  const [quantity, setQuantity] = useState(1);

  const { data: wishlistData } = useWishlistData();

  /**
   * ============================================================
   * 📌 Not found page
   * ============================================================
   */
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <NotFound />;
  }
  const basePrice = data?.basePrice ? data.basePrice : 0;
  const salePrice = data?.salePrice ? data?.salePrice : 0;
  const discount = Math.round(((basePrice - salePrice) / basePrice) * 100);

  const handleAddToCart = () => {
    console.log("[v0] Added to cart:", {
      product: mockProduct.title,
      quantity,
      color: selectedColor,
    });
  };

  const handleBuyNow = () => {
    console.log("[v0] Buy now:", {
      product: mockProduct.title,
      quantity,
      color: selectedColor,
    });
  };

  /**
   * ============================================================
   * 📌 Wishlist data
   * ============================================================
   */
  const inWishlist = wishlistData?.find((obj) => obj.productId === id);

  // console.log(data.specification);

  const result = Object.fromEntries(
    (data.specification as { key: string; value: string }[]).map((i) => [
      i.key,
      i.value,
    ]),
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Product Section */}
      <div className="container-default px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gallery */}
          <ProductGallery images={data.images} />

          {/* Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground leading-tight">
                    {data.title}
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {data.shortDescription}
                  </p>
                </div>
                <WishlistButton
                  isWishlisted={inWishlist?.productId ? true : false}
                  productId={id}
                  showTitle={false}
                  variant="ghost"
                  className="size-6"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {mockProduct.rating} ({mockProduct.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-foreground">
                  {fromatPrice(salePrice)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {fromatPrice(basePrice)}
                </span>
                <Badge variant="destructive" className="text-base px-3 py-1">
                  -{discount}%
                </Badge>
              </div>
              <p className="text-sm text-green-600 font-medium">
                Save ${(basePrice - salePrice).toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div>
              {mockProduct.stock > 0 ? (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-foreground">
                    In Stock ({mockProduct.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-foreground">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Color Selection */}
            {data?.color?.length >= 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-foreground">
                  Color:{" "}
                  <span className="font-normal text-muted-foreground">
                    {selectedColor}
                  </span>
                </label>
                <div className="flex gap-3">
                  {data?.color?.map((color) => (
                    <button
                      key={color}
                      style={{ color: color }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition cursor-pointer ${
                        selectedColor === color
                          ? "border-primary bg-primary/20 text-primary-foreground"
                          : "border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-foreground">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-lg border border-border hover:bg-muted transition flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(mockProduct.stock, quantity + 1))
                  }
                  className="h-10 w-10 rounded-lg border border-border hover:bg-muted transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 text-base"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Buy Now
              </Button>
            </div>

            {/* Coupon Code */}
            {data?.cupon && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">Use code</p>
                <p className="text-lg font-bold text-foreground">
                  {data?.cupon}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  for additional discount
                </p>
              </div>
            )}

            {/* Trust Badges */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">
                    30-Day Returns
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Full refund guarantee
                  </p>
                </div>
              </div>
              {data.cashOnDelevary && (
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Available in your area
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <ProductSpecs specification={result} />

        {/* Description */}
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Product Description
          </h2>
          <div className="container-default">
            {/* {mockProduct.description} */}
            <HtmlParser html={data.description} />
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection productId={mockProduct.id} />

        {/* Related Products */}
        <RelatedProducts currentProductId={mockProduct.id} />
      </div>
    </main>
  );
};
