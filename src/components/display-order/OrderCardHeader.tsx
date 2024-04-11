import { CardHeader } from '@/components/ui/card'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '../ui/button'
import { GoClock } from 'react-icons/go'
import { OrderStatus } from '@/types/display-order'
import { ORDER_STATUS } from '@/constants/constant'
import { orderUpdate } from '@/actions/display-order'
import { format } from 'date-fns'

interface IProps {
  order_status: OrderStatus
  order_id: number
  takeout: boolean
  created_at: Date
}

const OrderCardHeader = ({
  order_status,
  order_id,
  takeout,
  created_at,
}: IProps) => {
  const [elapsedMinute, setElapsedMinute] = useState(0)

  return (
    <CardHeader className="bg-gray-900 text-white p-5 rounded-t-md flex flex-col gap-3  ">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <strong>#{order_id}</strong>
          {takeout ? (
            <Badge className="bg-white text-black">포장</Badge>
          ) : (
            <Badge className="bg-white text-black">매장</Badge>
          )}
        </div>
        <div className="flex">
          {order_status === ORDER_STATUS.RECEIVE && (
            <span>{format(new Date(created_at), 'HH:mm')}</span>
          )}
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
          <Button
            className="bg-blue-500 hover:bg-blue-300 flex-1"
            onClick={() => {
              orderUpdate('complete', order_id)
            }}
          >
            완료
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-300 flex-1"
            onClick={() => {
              orderUpdate('cancel', order_id)
            }}
          >
            취소
          </Button>
        </div>
      )}
    </CardHeader>
  )
}

export default OrderCardHeader
