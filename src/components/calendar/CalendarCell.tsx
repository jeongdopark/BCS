'use client'

import { format } from 'date-fns'
import { useOrderHistory } from '@/hooks/history/useHistoryService'
import { useRouter } from 'next/navigation'

const CalendarCell = ({
  isCurrentMonth,
  isToday,
  date,
  store_id,
}: {
  isCurrentMonth: boolean
  isToday: boolean
  date: Date
  store_id: string
}) => {
  const router = useRouter()
  const URI_DATE = format(new Date(date), 'yyyyMMdd')

  const { data: history_order } = useOrderHistory({ store_id, date })
  const TOTAL_REVENUE = history_order?.reduce(
    (acc, curr) => acc + curr.price,
    0,
  )

  return (
    <div
      key={format(date, 'd')}
      className={`flex flex-col gap-2 p-1 text-sm w-full rounded-md hover:bg-gray-100 cursor-pointer ${!isCurrentMonth && 'text-gray-400'}`}
      onClick={() =>
        router.push(`/store/${store_id}/order-history/${URI_DATE}`)
      }
    >
      <div className="flex items-center gap-1">
        <span>{format(date, 'd')}</span>
        {isToday && (
          <div className="text-white text-xs p-1 pl-2 pr-2 rounded-lg bg-red-400">
            오늘
          </div>
        )}
      </div>

      {isCurrentMonth && TOTAL_REVENUE && (
        <span>{TOTAL_REVENUE.toLocaleString()}</span>
      )}
    </div>
  )
}

export default CalendarCell
