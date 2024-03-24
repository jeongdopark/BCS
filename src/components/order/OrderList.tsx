import { Button } from '../ui/button'

const OrderList = async () => {
  return (
    <div className="flex flex-col gap-3 h-lvh border-l-[1px] p-3 pt-8">
      <strong>주문 상품</strong>
      <section className="flex flex-col gap-3 h-[70%] overflow-scroll">
        <div className="flex justify-center items-center h-full font-bold">
          주문할 상품을 선택해 주세요.
        </div>
      </section>
      <div className=" flex flex-col gap-5 p-5 border-t-[1px]">
        <span>주문 금액 : 0원</span>
        <Button>주문하기</Button>
      </div>
    </div>
  )
}

export default OrderList
