import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'
import { Calendar, LineChart, Package2 } from 'lucide-react'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { store_id: string }
}) {
  const MENU = [
    {
      url: `/store/${params.store_id}/calendar`,
      name: '매출 달력',
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/dashboard`,
      name: '대시보드',
      icon: <LineChart className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/product?page=1`,
      name: '상품 관리',
      icon: <Package2 className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/category?page=1`,
      name: '카테고리',
      icon: <BiCategory />,
    },
    {
      url: `/store/${params.store_id}/display-order`,
      name: '주문 현황',
      icon: <BiCategory />,
    },
    {
      url: `/store/${params.store_id}/order`,
      name: '주문 페이지',
      icon: <BiCategory />,
    },
  ]

  return (
    <>
      <div className="flex w-full min-h-lvh">
        <div className="w-[200px] bg-zinc-50 p-10 flex-grow ">
          <ul>
            {MENU.map((e) => (
              <li className="mb-3" key={e.url}>
                <Link href={e.url}>
                  <div className="flex gap-3 items-center justify-start">
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
