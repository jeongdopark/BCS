import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { IOrder } from '@/types/order'
import BasketCard from '../order/funnel/BasketCard'

interface IProps {
  isTakeout: boolean
  price: number
  time: string
  orders: IOrder[]
}

const OrderDetailModal = ({ orders, isTakeout, price, time }: IProps) => {
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
                return <BasketCard order={order} key={order.uid} />
              })}
              {isTakeout ? <strong>포장</strong> : <strong>매장</strong>}
              <strong>결제 금액 : {price.toLocaleString()}원</strong>
              <strong>결제 시각 : {time}</strong>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default OrderDetailModal
