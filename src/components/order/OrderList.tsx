'use client'
import { IOrder, useOrderStore } from '@/stores/order'
import { Button } from '../ui/button'
import OrderCard from './OrderCard'
import { useRouter } from 'next/navigation'
import Header from './funnel/Header'

const OrderList = () => {
  const orderList = useOrderStore((state) => state.orders)
  const TOTAL_AMOUNT = useOrderStore((state) => state.total_amount)
  const router = useRouter()

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
            <OrderCard order={order}>{order.product_name}</OrderCard>
          ))
        )}
      </section>
      <div className=" flex flex-col gap-5 p-5 border-t-[1px]">
        <span>주문 금액 : {TOTAL_AMOUNT}원</span>
        <Button onClick={() => router.push('/order/payment')}>주문하기</Button>
      </div>
    </div>
  )
}

export default OrderList
