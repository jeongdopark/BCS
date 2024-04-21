'use client'
import { useOrderStore } from '@/stores/order'
import { IOrder } from '@/types/order'
import { Button } from '../ui/button'
import OrderCard from './OrderCard'
import { useRouter } from 'next/navigation'
import Header from './funnel/Header'

const OrderList = ({ store_id }: { store_id: string }) => {
  const orderList = useOrderStore((state: any) => state.orders)
  const TOTAL_AMOUNT = useOrderStore((state: any) => state.total_amount)
  const router = useRouter()
  const init_store = useOrderStore((state: any) => state.initStore)

  return (
    <div className="flex flex-col gap-3 h-lvh border-l-[1px] p-3 pt-8">
      <div className="flex items-center justify-between">
        <strong>주문 상품</strong>
        <Header step="first" />
      </div>
      <section className="flex flex-col gap-3 h-[80%] overflow-scroll">
        {orderList.length === 0 ? (
          <div className="flex justify-center items-center h-full font-bold">
            주문할 상품을 선택해 주세요.
          </div>
        ) : (
          orderList.map((order: IOrder) => (
            <OrderCard key={order.uid} order={order} />
          ))
        )}
      </section>
      <div className=" flex flex-col gap-5 p-5 border-t-[1px]">
        <span>주문 금액 : {TOTAL_AMOUNT.toLocaleString()}원</span>
        <div className="flex gap-3 w-full justify-center">
          <Button className="flex-1" onClick={() => init_store()}>
            전체 삭제
          </Button>
          <Button
            className="flex-1"
            onClick={() => router.push(`/store/${store_id}/order/payment`)}
          >
            주문하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderList
