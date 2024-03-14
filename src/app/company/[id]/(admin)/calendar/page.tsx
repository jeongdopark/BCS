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

export default async function CalendarPage() {
  return <Calendar />
}
