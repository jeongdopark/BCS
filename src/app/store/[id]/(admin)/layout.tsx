import Link from 'next/link'
import { CiCalendar } from 'react-icons/ci'
import { BsBox2 } from 'react-icons/bs'
import { LuLineChart } from 'react-icons/lu'
import { BiCategory } from 'react-icons/bi'
import { Calendar, LineChart, Package2 } from 'lucide-react'
const MENU = [
  {
    url: '/calendar',
    name: '매출달력',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    url: '/dashboard',
    name: '대시보드',
    icon: <LineChart className="h-4 w-4" />,
  },
  {
    url: '/product?page=1',
    name: '상품관리',
    icon: <Package2 className="h-4 w-4" />,
  },
  {
    url: '/category?page=1',
    name: '카테고리',
    icon: <BiCategory />,
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full min-h-lvh">
        <div className="w-[200px] bg-zinc-50 p-10 flex-grow ">
          <ul>
            {MENU.map((e) => (
              <li className="mb-3" key={e.url}>
                <Link href={e.url}>
                  <div className="flex gap-3 items-center justify-center">
                    <span>{e.icon}</span>
                    <span>{e.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center w-full relative">{children}</div>
      </div>
    </>
  )
}
