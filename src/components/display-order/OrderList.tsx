import { IOrderDisplay, OrderStatus } from '@/types/display-order'
import OrderCard from './OrderCard'

interface IProps {
  page: number
  status: OrderStatus
  orders: IOrderDisplay[] | undefined
}

const OrderList = ({ page, status, orders }: IProps) => {
  if (!orders) return

  const order_data = orders!
    .filter((e) => {
      return status === e.order_status[0]
    })
    .slice((page - 1) * 5, page * 5)

  return (
    <div className="w-full p-10 flex gap-3 justify-start items-start">
      {order_data.map((e) => (
        <OrderCard
          key={e.order_number}
          order_id={e.id}
          order_time={e.order_time}
          order_menus={e.order_menus}
          order_number={e.order_number}
          order_status={status as OrderStatus}
          complete_time={e.complete_time}
        />
      ))}
      {order_data.length === 0 && (
        <div className="w-full h-[500px] flex justify-center items-center">
          <strong>No Result</strong>
        </div>
      )}
    </div>
  )
}

export default OrderList
