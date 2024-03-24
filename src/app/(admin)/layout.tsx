import Link from 'next/link'

const MENU = [
  {
    url: '/calendar',
    name: '매출달력',
  },
  {
    url: '/dashboard',
    name: '대시보드',
  },
  {
    url: '/product?page=0&category=coffee',
    name: '상품관리',
  },
  {
    url: '/category',
    name: '카테고리',
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex w-full min-h-lvh">
        <div className="w-[200px] bg-gray-200 p-10 flex-grow">
          <ul>
            {MENU.map((e) => (
              <li className="mb-3" key={e.url}>
                <Link href={e.url}>{e.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center w-full relative">{children}</div>
      </div>
    </>
  )
}
