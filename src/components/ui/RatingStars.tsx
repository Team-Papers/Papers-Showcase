import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: number;
}

export default function RatingStars({ rating, count, size = 14 }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= Math.round(rating)
              ? 'fill-accent text-accent'
              : 'text-outline'
          }
        />
      ))}
      {count !== undefined && (
        <span className="ml-1 text-xs text-on-surface-variant">({count})</span>
      )}
    </div>
  );
}
