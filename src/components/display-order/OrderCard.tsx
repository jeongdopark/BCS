'use client'

import { Card, CardContent } from '@/components/ui/card'
import OrderCardHeader from './OrderCardHeader'
import { OrderStatus } from '@/types/display-order'

interface IProps {
  order_time: string
  order_status: OrderStatus
  order_number: number
  order_menus: { menu: string; amount: number }[]
  order_id: string
  complete_time: string
}

const OrderCard = ({
  order_status,
  order_number,
  order_menus,
  order_time,
  order_id,
  complete_time,
}: IProps) => {
  return (
    <Card className="w-[25%]">
      <OrderCardHeader
        order_id={order_id}
        order_time={order_time}
        order_status={order_status}
        order_number={order_number}
        complete_time={complete_time}
      />
      <CardContent>
        {order_menus.map((e, idx) => (
          <div
            key={idx}
            className={`p-5 ${idx !== order_menus.length - 1 && 'border-b'} border-gray-200 flex gap-5`}
          >
            <strong>{e.amount}</strong>
            <strong>{e.menu}</strong>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default OrderCard
