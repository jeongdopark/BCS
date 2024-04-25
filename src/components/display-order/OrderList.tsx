'use client'

import { OrderStatus } from '@/types/order'
import OrderCard from './OrderCard'
import { IDisplayOrder } from '@/types/order'
import { ORDER_DISPLAY_PAGINATION_SIZE } from '@/constants/constant'
import FallbackOrderList from './skeleton/FallbackOrderCard'

interface IProps {
  page: number
  status: OrderStatus
  orders: IDisplayOrder[]
}

const OrderList = ({ page, status, orders }: IProps) => {
  if (!orders) return <FallbackOrderList />
  const filtered_orders = orders
    .filter((order) => {
      return status === order.status
    })
    .reverse()
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
