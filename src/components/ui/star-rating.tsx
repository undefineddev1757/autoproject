import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StarRatingProps {
  /** Number of stars to display */
  count?: number
  /** Additional classes for the wrapper */
  className?: string
  /** Tailwind classes for each star icon */
  sizeClass?: string
}

export function StarRating({
  count = 5,
  className,
  sizeClass = 'w-4 h-4',
}: StarRatingProps) {
  const ids = React.useMemo(() =>
    Array.from({ length: count }, (_, i) => `star-${i}`),
  [count])

  return (
    <div className={cn('flex space-x-1', className)}>
      {ids.map((id) => (
        <Star
          key={id}
          className={cn(sizeClass, 'fill-yellow-400 text-yellow-400')}
        />
      ))}
    </div>
  )
}
