"use client";

import { Button } from "@workspace/ui/components/button";
import { Star } from "lucide-react";

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

interface ReviewsSectionProps {
  productId: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    rating: 5,
    title: "Best headphones I've ever owned!",
    content:
      "The sound quality is absolutely incredible. The noise cancellation works perfectly even on noisy flights. Battery life is exactly as advertised.",
    date: "2 weeks ago",
    helpful: 45,
  },
  {
    id: "2",
    author: "Michael Chen",
    rating: 4,
    title: "Great quality, minor comfort issue",
    content:
      "Sound is excellent and ANC is very effective. The only downside is they feel a bit tight after 3+ hours of continuous wear. Still highly recommend.",
    date: "1 month ago",
    helpful: 32,
  },
  {
    id: "3",
    author: "Emma Davis",
    rating: 5,
    title: "Professional grade at consumer price",
    content:
      "I use these for music production and they deliver studio-quality sound. Worth every penny. Great warranty and customer support too!",
    date: "1 month ago",
    helpful: 28,
  },
];

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  return (
    <section className="mt-16 space-y-8 border-t border-border pt-12">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Customer Reviews
        </h2>
        <p className="text-muted-foreground">
          {mockReviews.length} verified reviews from real customers
        </p>
      </div>

      {/* Review Summary */}
      <div className="rounded-lg bg-muted/50 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-foreground">4.7</div>
            <div className="flex items-center gap-1 justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? "fill-amber-400 text-amber-400" : i === 4 ? "fill-amber-400/50 text-amber-400/50" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">328 reviews</p>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground w-8">
                  {stars}★
                </span>
                <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${[60, 25, 10, 3, 2][5 - stars]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {[60, 25, 10, 3, 2][5 - stars]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full" variant="outline">
          Write a Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-border pb-6 last:border-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">
                    {review.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    • {review.date}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-foreground mb-2">
              {review.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {review.content}
            </p>

            <button className="text-sm font-medium text-primary hover:underline">
              Helpful ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
