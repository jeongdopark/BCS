import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Payment, columns } from '@/constants/constant'
import { format } from 'date-fns'
import { DataTable } from './DataTable'
const data: Payment[] = [
  {
    UID: 'EEEEAA',
    price: 15000,
    time: '2024-02-11, 19:21',
    payment: 'toss',
  },
  {
    UID: 'KOWEAA',
    price: 4000,
    time: '2024-02-11, 19:21',
    payment: 'kakao',
  },
  {
    UID: 'EEKEAA',
    price: 15000,
    time: '2024-02-11, 19:21',
    payment: 'kakao',
  },
  {
    UID: 'AEEEAA',
    price: 10000,
    time: '2024-02-11, 19:21',
    payment: 'toss',
  },
  {
    UID: 'DSEEAA',
    price: 15000,
    time: '2024-02-11, 19:21',
    payment: 'toss',
  },
  {
    UID: 'WOSEAA',
    price: 17000,
    time: '2024-02-11, 19:21',
    payment: 'kakao',
  },
  {
    UID: 'DSEEAA',
    price: 15000,
    time: '2024-02-11, 19:21',
    payment: 'toss',
  },
  {
    UID: 'WOSEAA',
    price: 17000,
    time: '2024-02-11, 19:21',
    payment: 'kakao',
  },
  {
    UID: 'AQSEAA',
    price: 15000,
    time: '2024-02-11, 19:21',
    payment: 'toss',
  },
]
const HistoryModal = ({
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
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%] h-[80%] p-5 overflow-scroll">
        <DialogHeader>
          <DialogTitle className="mb-5">
            {format(date, 'yyyy.MM.dd')}
          </DialogTitle>
          <DialogDescription>
            <div className="w-full flex flex-col gap-5 items-center justify-center text-black ">
              <div className="w-[90%] min-h-[40%] border-gray-200 rounded-lg border flex justify-center items-center flex-col p-5">
                <div className=" grid grid-cols-2 w-full justify-items-center items-center text-center gap-4">
                  <div className="flex flex-col justify-center ">
                    <div className="text-md">매출</div>
                    <div className="text-3xl">
                      {DAY_REVENUE?.toLocaleString()}원
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-md">주문건</div>
                    <div className="text-3xl">50건</div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-md">환불</div>
                    <div className="text-3xl">6,000원</div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="text-md">Best 메뉴</div>
                    <div className="text-3xl">아메리카노</div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default HistoryModal
