'use client'

import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { IOrder, useOrderStore } from '@/stores/order'

const OrderCard = ({ order }: { order: IOrder }) => {
  const removeOrder = useOrderStore((state) => state.removeOrder)

  return (
    <Card className="flex p-3 gap-2 ">
      <div className="flex flex-col w-full">
        <strong>{order.product_name}</strong>
        <strong>{order.price.toLocaleString()}원</strong>
        <strong>{order.count}개</strong>
        <ul>
          {order.options!.map((order) => (
            <li>
              {order.name} :{order.option}
            </li>
          ))}
        </ul>
        <Button size="sm" onClick={() => removeOrder(order.uid, order.price)}>
          취소
        </Button>
      </div>
    </Card>
  )
}

export default OrderCard
