'use client'

import { useHistoryOrder } from '@/hooks/query/useHistoryOrder'
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

const OrderHistoryDetail = ({
  store_id,
  date,
}: {
  store_id: string
  date: Date
}) => {
  const { data: history_order } = useHistoryOrder(store_id, date)
  const DAY_REVENUE = history_order?.reduce((acc, curr) => acc + curr.price, 0)

  return (
    <div className="flex flex-col w-[90%] p-5 mt-5">
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
              <TableRow>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), 'HH:mm')}
                </TableCell>
                <TableCell>
                  <OrderDetailModal orders={order.orders} />
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
