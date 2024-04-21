'use client'

import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useOrderStore } from '@/stores/order'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { IOrder } from '@/types/order'

const OrderCard = ({ order }: { order: IOrder }) => {
  const removeOrder = useOrderStore((state: any) => state.removeOrder)

  return (
    <Card className="flex p-3 gap-2 flex-col w-full">
      <div className="flex gap-3">
        <div className="rounded-md relative w-[90px] h-[90px] overflow-hidden">
          <Image src={order.img_url!} fill alt={order.product_name} />
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-sm">{order.product_name}</span>
          <span className="text-sm">{order.price.toLocaleString()}원</span>
          <span className="text-sm">{order.count}개</span>
          <ul className="flex gap-1">
            {order.options!.map((order) => (
              <li key={`${order.name}-${order.price}`}>
                <Badge variant="outline">{order.option}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Button size="sm" onClick={() => removeOrder(order.uid, order.price)}>
          취소
        </Button>
      </div>
    </Card>
  )
}

export default OrderCard
