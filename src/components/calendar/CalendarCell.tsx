import { format } from 'date-fns'

const CalendarCell = ({
  isCurrentMonth,
  isToday,
  DAY_REVENUE,
  date,
}: {
  isCurrentMonth: boolean
  isToday: boolean
  DAY_REVENUE: number | null
  date: Date
}) => {
  return (
    <div
      key={format(date, 'd')}
      className={`flex flex-col gap-2 p-1 text-sm w-full rounded-md hover:bg-gray-100 cursor-pointer ${!isCurrentMonth && 'text-gray-400'}`}
    >
      <div className="flex items-center gap-1">
        <span>{format(date, 'd')}</span>
        {isToday && (
          <div className="text-white text-xs p-1 pl-2 pr-2 rounded-lg bg-red-400">
            오늘
          </div>
        )}
      </div>

      {isCurrentMonth && DAY_REVENUE && (
        <span>{DAY_REVENUE.toLocaleString()}</span>
      )}
    </div>
  )
}

export default CalendarCell
