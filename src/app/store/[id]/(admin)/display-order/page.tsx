'use client'
import { IOrderDisplay, OrderStatus } from '@/types/display-order'
import Header from '@/components/display-order/Header'
import OrderList from '@/components/display-order/OrderList'
import PageController from '@/components/display-order/PageController'
import { useState } from 'react'
import FallbackHeader from '@/components/display-order/skeleton/FallbackHeader'
import FallbackOrderList from '@/components/display-order/skeleton/FallbackOrderCard'

export default function DisplayOrderPage({
  searchParams,
}: {
  searchParams: { page: string; status: OrderStatus }
}) {
  const [orders, setOrders] = useState<IOrderDisplay[]>()
  const [totalPage, setTotalPage] = useState(0)
  const page = searchParams.page
  const [getDataTrigger, setGetDataTrigger] = useState<boolean>(false)

  if (!orders) {
    return (
      <div className="relative h-lvh">
        <FallbackHeader />
        <FallbackOrderList />
      </div>
    )
  }

  return (
    <div className="relative h-lvh">
      <Header orders={orders} param={searchParams.status} />
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
