'use client'

import { Skeleton } from '../ui/skeleton'

const CategoryFallback = () => {
  return (
    <div className="w-[200px] min-h-lvh flex justify-center p-3 border-r-[1px]">
      <ul className="flex flex-col gap-3 mt-5">
        <strong>카테고리</strong>
        <Skeleton className="h-[40px] w-[112px] rounded-xl" />
        <Skeleton className="h-[40px] w-[112px] rounded-xl" />
        <Skeleton className="h-[40px] w-[112px] rounded-xl" />
        <Skeleton className="h-[40px] w-[112px] rounded-xl" />
      </ul>
    </div>
  )
}

export default CategoryFallback
