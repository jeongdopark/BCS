'use client'
import { Skeleton } from '../ui/skeleton'

const CategoryFallback = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[40px] w-full rounded-xl" />
    </div>
  )
}

export default CategoryFallback
