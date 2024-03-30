import { CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
import { GoClock } from 'react-icons/go'
import { OrderStatus } from '@/types/display-order'
import { ORDER_STATUS } from '@/constants/constant'

interface IProps {
  order_time: string
  order_status: OrderStatus
  order_number: number
  order_id: string
  complete_time: string
}

const OrderCardHeader = ({
  order_time,
  order_number,
  order_status,
  order_id,
  complete_time,
}: IProps) => {
  const [timeTrigger, setTimeTrigger] = useState(false)
  const [elapsedMinute, setElapsedMinute] = useState(0)

  return (
    <CardHeader className="bg-gray-900 text-white p-5 rounded-t-md flex flex-col gap-3  ">
      <div className="flex justify-between">
        <strong>#{order_number}</strong>
        <div className="flex gap-2">
          {order_status === ORDER_STATUS.RECEIVE && <span>time</span>}
          {order_status === ORDER_STATUS.RECEIVE ? (
            <Badge>
              <GoClock />
              {elapsedMinute}분 경과
            </Badge>
          ) : (
            <Badge className={`bg-white text-black flex gap-2`}>
              <GoClock />
            </Badge>
          )}
        </div>
      </div>
      {order_status === ORDER_STATUS.RECEIVE && (
        <div className="flex justify-between gap-2">
          <Button className="bg-blue-500 hover:bg-blue-300 flex-1">완료</Button>
          <Button className="bg-red-500 hover:bg-red-300 flex-1">취소</Button>
        </div>
      )}
    </CardHeader>
  )
}

export default OrderCardHeader