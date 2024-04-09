import Calendar from '@/components/calendar/Calendar'

type Order = {
  menu: string
  category: string
  quantity: number
  price: number
}

export type History = {
  id: string
  total_price: number
  payment_method: 'kakao-pay' | 'toss-pay' | 'payco'
  payment_time: string
  orders: Order[]
}

export default function CalendarPage({
  params,
}: {
  params: { store_id: string }
}) {
  return <Calendar store_id={params.store_id} />
}
