'use client'

import { IOrder } from '@/stores/order'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const BasketCard = ({ order }: { order: IOrder }) => {
  return (
    <Card className="flex p-3 gap-2 flex-col w-full">
      <div className="flex gap-3">
        {order.img_url && (
          <div className="rounded-md relative w-[90px] h-[90px] overflow-hidden">
            <Image src={order.img_url} fill alt={order.product_name} />
          </div>
        )}
        <div className="flex flex-col justify-between">
          <span className="text-sm">{order.product_name}</span>
          <span className="text-sm">{order.price.toLocaleString()}원</span>
          <span className="text-sm">{order.count}개</span>
          <ul className="flex gap-1">
            {order.options!.map((order) => (
              <li>
                <Badge variant="outline">{order.option}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default BasketCard
