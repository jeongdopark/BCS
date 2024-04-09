import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Button } from '../ui/button'
import { IOrder } from '@/hooks/query/useHistoryOrder'
import BasketCard from '../order/funnel/BasketCard'

const OrderDetailModal = ({ orders }: { orders: IOrder[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">상세 보기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] h-[80%] p-5 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-5">주문 상세 모달</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-3">
              {orders.map((order) => {
                return <BasketCard order={order} />
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailModal
