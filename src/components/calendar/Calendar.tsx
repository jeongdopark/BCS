'use client'
import { useHistoryOrder } from '@/hooks/query/useHistoryOrder'
import { useMemo, useState } from 'react'
import { SlArrowUp, SlArrowDown } from 'react-icons/sl'
import {
  format,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  differenceInCalendarDays,
  getMonth,
  isSunday,
} from 'date-fns'
import { History } from '@/app/store/[store_id]/(admin)/calendar/page'
import TotalRevenue from './TotalRevenue'
import Header from './Header'
import { Button } from '@/components/ui/button'
import CalendarCell from './CalendarCell'

type MOCK_DATA = {
  [key: string]: History[]
}

const Calendar = ({ store_id }: { store_id: string }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)
  const weekMock = ['일', '월', '화', '수', '목', '금', '토']

  const dateHandler = (func: Function) => {
    return () => {
      setCurrentDate(func(currentDate, 1))
    }
  }

  const createMonth = useMemo(() => {
    const monthArray = []
    let weekArray = []
    let day = startDate

    while (differenceInCalendarDays(endDate, day) >= 0) {
      weekArray.push(day)
      day = addDays(day, 1)

      if (isSunday(day)) {
        monthArray.push(weekArray)
        weekArray = []
      }
    }

    if (weekArray.length > 0) {
      monthArray.push(weekArray)
    }

    return monthArray
  }, [startDate, endDate])

  return (
    <div className="flex justify-center w-full gap-10">
      <div className="flex w-[60%] flex-col justify-center items-center gap-2">
        <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <TotalRevenue />
        <div className="w-full h-[70%] flex justify-center">
          <section className="w-full  p-5 border-2 border-gray-200 rounded-xl flex flex-col gap-4">
            <div className="w-full flex flex-row justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>최저
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <div className="w-4 h-4 bg-red-400 rounded-full"></div>최고
                </div>
              </div>
              <div className="text-sm text-gray-500">
                날짜를 누르면 해당일의 상세내역을 볼 수 있어요.
              </div>
            </div>
            <div className="w-full flex justify-around text-left">
              {weekMock.map((v, i) => {
                return (
                  <div className=" w-full" key={`day${i}`}>
                    {v}
                  </div>
                )
              })}
            </div>
            <div className="flex h-full w-full flex-col gap-2 border-gray-200">
              {createMonth.map((week, i) => {
                return (
                  <div className="flex w-full h-full">
                    <div key={`week${i}`} className="flex w-full">
                      {week.map((v, j) => {
                        const isCurrentMonth =
                          getMonth(v) === getMonth(currentDate)
                        const isToday =
                          format(v, 'yyyyMMdd') ===
                          format(new Date(), 'yyyyMMdd')
                        let DAY_REVENUE = null

                        return (
                          <CalendarCell
                            store_id={store_id}
                            isCurrentMonth={isCurrentMonth}
                            isToday={isToday}
                            DAY_REVENUE={DAY_REVENUE}
                            date={v}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
      <div className="flex h-full flex-col justify-center gap-2">
        <Button
          className="bg-white border border-gray-200 h-[250px]"
          onClick={dateHandler(addYears)}
          size="sm"
        >
          <SlArrowUp className="text-black" size="10" />
        </Button>
        <Button
          className="bg-white border border-gray-200 h-[250px]"
          onClick={dateHandler(subYears)}
          size="sm"
        >
          <SlArrowDown className="text-black" size="10" />
        </Button>
      </div>
    </div>
  )
}

export default Calendar
