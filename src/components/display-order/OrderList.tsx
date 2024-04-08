'use client'

import { OrderStatus } from '@/types/display-order'
import OrderCard from './OrderCard'
import { IDisplayOrder } from '@/hooks/query/useDisplayOrderQuery'
import { ORDER_DISPLAY_PAGINATION_SIZE } from '@/app/store/[store_id]/display-order/page'

interface IProps {
  page: number
  status: OrderStatus
  orders: IDisplayOrder
}

const OrderList = ({ page, status, orders }: IProps) => {
  if (!orders) return

  const filtered_orders = orders
    .data!.filter((order) => {
      return status === order.status
    })
    .slice(
      (page - 1) * ORDER_DISPLAY_PAGINATION_SIZE,
      page * ORDER_DISPLAY_PAGINATION_SIZE,
    )

  return (
    <div className="w-full p-10 flex gap-3 justify-start items-start">
      {filtered_orders!.map((order) => (
        <OrderCard order={order} key={order.id} />
      ))}
    </div>
  )
}

export default OrderList
