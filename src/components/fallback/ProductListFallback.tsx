'use client'

import { Skeleton } from '../ui/skeleton'

const ProductListFallback = () => {
  return (
    <div className="flex flex-col w-[90%] gap-3">
      <div className="grid grid-cols-2 gap-10 ">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  )
}

export default ProductListFallback
