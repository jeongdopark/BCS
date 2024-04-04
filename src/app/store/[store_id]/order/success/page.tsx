'use client'

import { useOrderStore } from '@/stores/order'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Success({ params }: { params: { store_id: string } }) {
  const total_amount = useOrderStore((state) => state.total_amount)
  const order = useOrderStore((state) => state.orders)
  const init_store = useOrderStore((state) => state.initStore)
  console.log(total_amount, order)

  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      init_store()
      router.push(`/store/${params.store_id}/order`)
    }, 3000)
  }, [])
  return <div>결제 성공</div>
}
