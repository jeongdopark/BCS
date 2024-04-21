'use client'

import { Card, CardContent } from '@/components/ui/card'
import OrderCardHeader from './OrderCardHeader'
import { IDisplayOrder } from '@/types/order'

const OrderCard = ({ order }: { order: IDisplayOrder }) => {
  return (
    <Card className="w-[25%]">
      <OrderCardHeader
        created_at={order.created_at}
        order_status={order.status}
        order_id={order.id}
        takeout={order.takeout}
      />
      <CardContent>
        {order.orders.map((e, idx) => (
          <div
            key={idx}
            className={`p-5 ${idx !== order.orders.length - 1 && 'border-b'} border-gray-200 flex flex-col`}
          >
            <div>
              <strong>{e.count}</strong>
              <strong className="ml-3">{e.product_name}</strong>
            </div>
            {e.options?.map((option) => (
              <li key={option.name}>
                {option.name} : {option.option}
              </li>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default OrderCard
