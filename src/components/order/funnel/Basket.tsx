'use client'
import { useOrderStore } from '@/stores/order'
import { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import Header from './Header'
import BasketCard from './BasketCard'
const Basket = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<'takeout' | 'basket' | 'payment'>>
}) => {
  const orderList = useOrderStore((state) => state.orders)
  const total_amount = useOrderStore((state) => state.total_amount)

  return (
    <div className="flex flex-col items-center w-full justify-between overflow-scroll">
      <Header step="basket" />
      <div className="p-5 flex flex-col gap-3 w-full">
        <strong>주문 상품 확인</strong>
        {orderList.map((order) => (
          <BasketCard order={order} />
        ))}
        <strong>주문 금액 : {total_amount.toLocaleString()}원</strong>
      </div>
      <div className="flex justify-center gap-3 w-full ">
        <Button
          size="lg"
          className="w-[100px]"
          onClick={() => setStep('takeout')}
        >
          뒤로가기
        </Button>
        <Button
          size="lg"
          className="w-[100px]"
          onClick={() => setStep('basket')}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Basket
