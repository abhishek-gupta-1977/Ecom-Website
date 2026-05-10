import React from 'react'
import { Marquee } from './ui/marquee'
import ReviewCard from './ReviewCard'

import { reviews } from './data/reviews.js'

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const Reviews = () => {
  return (
     <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#E1E5F8]/60 py-8 sm:py-10 lg:py-14">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}

export default Reviews
