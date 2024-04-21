'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa6'
import { OrderStatus } from '@/types/order'

interface IProp {
  page: number
  total_page: number
  status: OrderStatus
}

const PageController = ({ page, total_page, status }: IProp) => {
  const router = useRouter()

  return (
    <div className="flex justify-end pr-10 gap-2 absolute bottom-10 right-5">
      <Button
        className={`bg-gray-300 hover:bg-gray-100 w-[80px] h-[60px] ${page <= 1 ? 'pointer-events-none opacity-50' : undefined}`}
        onClick={() => router.push(`?status=${status}&page=${page - 1}`)}
      >
        <FaAngleLeft className="text-black size-5" />
      </Button>
      <Button
        className={`bg-gray-300 hover:bg-gray-100 w-[80px] h-[60px] ${page >= total_page ? 'pointer-events-none opacity-50' : undefined}`}
        onClick={() => router.push(`?status=${status}&page=${page + 1}`)}
      >
        <FaAngleRight className="text-black size-5" />
      </Button>
    </div>
  )
}

export default PageController
