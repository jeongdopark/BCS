'use client'
import { OrderStatus } from '@/types/display-order'
import Header from '@/components/display-order/Header'
import OrderList from '@/components/display-order/OrderList'
import PageController from '@/components/display-order/PageController'
import { useEffect, useState } from 'react'
import { client } from '@/utils/supabase'
import { ORDER_DISPLAY_PAGINATION_SIZE } from '@/constants/constant'
import { useDisplayOrder } from '@/hooks/display-order/useDisplayOrderService'
export default function DisplayOrderPage({
  searchParams,
  params,
}: {
  searchParams: { page: string; status: OrderStatus }
  params: { store_id: string }
}) {
  const [totalPage, setTotalPage] = useState(0)
  const page = searchParams.page
  const { data: orders, refetch } = useDisplayOrder(params.store_id)

  useEffect(() => {
    const channel = client
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'display_order',
          filter: `store_id=eq.${params.store_id}`,
        },
        (payload) => {
          setTotalPage(
            Math.ceil(
              orders!.data!.filter(
                (order) => order.status === searchParams.status,
              ).length / 5,
            ),
          )
          refetch()
        },
      )
      .subscribe()
    if (orders) {
      setTotalPage(
        Math.ceil(
          orders!.data!.filter((order) => order.status === searchParams.status)
            .length / ORDER_DISPLAY_PAGINATION_SIZE,
        ),
      )
    }

    return () => {
      client.removeChannel(channel)
    }
  }, [orders])

  return (
    <div className="relative h-lvh">
      <Header orders={orders} store_id={params.store_id} />
      <OrderList
        page={Number(page)}
        status={searchParams.status}
        orders={orders}
      />
      <PageController
        page={Number(page)}
        total_page={totalPage}
        status={searchParams.status}
      />
    </div>
  )
}
