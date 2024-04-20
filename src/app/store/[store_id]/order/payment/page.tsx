'use client'
import { Skeleton } from '@/components/ui/skeleton'
import CheckCircleIcon from '@/components/fallback/CheckIcon'
import { useRouter } from 'next/navigation'

export default function Payment({ params }: { params: { store_id: string } }) {
  const router = useRouter()

  setTimeout(() => {
    router.push(`/store/${params.store_id}/order`)
  }, 3000)
  return (
    <div className="flex justify-center items-center w-full h-screen absolute top-0 left-0">
      <div className="grid max-w-3xl gap-4 px-4 mx-auto items-center space-y-4 ">
        <div className="flex flex-col items-center space-y-2 text-center">
          <CheckCircleIcon className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              에러가 발생하여 주문 페이지로 이동 중입니다.
            </h1>
          </div>
        </div>
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  )
}
