'use client'

import { useOrderHistory } from '@/hooks/history/useHistoryService'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { format } from 'date-fns'
import OrderDetailModal from './OrderDetailModal'
import { FaAngleLeft } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
const OrderHistoryDetail = ({
  store_id,
  date,
  params_date,
}: {
  store_id: string
  params_date: string
  date: Date
}) => {
  const { data: history_order } = useOrderHistory({ store_id, date })
  const router = useRouter()
  const DAY_REVENUE = history_order?.reduce((acc, curr) => acc + curr.price, 0)
  function parseAndFormatDate(dateStr: string) {
    const year = dateStr.substring(0, 4)
    const month = dateStr.substring(4, 6)
    const day = dateStr.substring(6, 8)

    const formattedDate = `${year}.${month}.${day}`
    return formattedDate
  }

  const parse_data = parseAndFormatDate(params_date)

  return (
    <div className="flex flex-col w-[90%] p-5 mt-5 gap-5">
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          className="bg-gray-200 hover:bg-gray-200"
          onClick={() => router.push(`/store/${store_id}/calendar`)}
        >
          <FaAngleLeft className="text-black size-5" />
        </Button>
        <strong className="text-xl">{parse_data} 매출 기록</strong>
      </div>
      <div className="w-full flex flex-col gap-5 items-center justify-center text-black ">
        <div className="w-full min-h-[150px] border-gray-200 rounded-lg border flex justify-center items-center flex-col p-5">
          <div className="grid grid-cols-2 w-full justify-items-center items-center text-center gap-4">
            <div className="flex flex-col justify-center ">
              <div className="text-md">매출</div>
              <div className="text-3xl">{DAY_REVENUE?.toLocaleString()}원</div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-md">주문건</div>
              <div className="text-3xl">{history_order?.length}건</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center"></div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UUID</TableHead>
            <TableHead>결제 금액</TableHead>
            <TableHead>결제 일시</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history_order?.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), 'HH:mm')}
                </TableCell>
                <TableCell>
                  <OrderDetailModal
                    orders={order.orders}
                    isTakeout={order.takeout}
                    price={order.price}
                    time={format(new Date(order.created_at), 'HH:mm')}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderHistoryDetail
