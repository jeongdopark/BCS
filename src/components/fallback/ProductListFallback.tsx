'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../ui/carousel'
import { Skeleton } from '../ui/skeleton'

const ProductListFallback = () => {
  return (
    <div className="w-[90%] flex flex-col gap-5">
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/2">
              <Skeleton className="h-[126px] w-full rounded-xl" />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/2">
              <Skeleton className="h-[126px] w-full rounded-xl" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/2">
              <Skeleton className="h-[126px] w-full rounded-xl" />
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/2">
              <Skeleton className="h-[126px] w-full rounded-xl" />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export default ProductListFallback
