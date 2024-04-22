import Link from 'next/link'
import Signout from '@/components/common/Signout'

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}

function LayoutDashboardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  )
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}

function TagIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { store_id: string }
}) {
  const MENU = [
    {
      url: `/store/${params.store_id}/calendar`,
      name: '매출달력',
      icon: <CalendarIcon className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/dashboard`,
      name: '대시보드',
      icon: <LayoutDashboardIcon className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/product?page=1`,
      name: '상품관리',
      icon: <PackageIcon className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/category?page=1`,
      name: '카테고리',
      icon: <TagIcon className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/display-order?status=receive&page=1`,
      name: '주문현황',
      icon: <ShoppingCartIcon className="h-4 w-4" />,
    },
    {
      url: `/store/${params.store_id}/order`,
      name: '주문페이지',
      icon: <FileTextIcon className="h-4 w-4" />,
    },
    {
      url: `/store-management`,
      name: '매장관리',
      icon: <FileTextIcon className="h-4 w-4" />,
    },
  ]

  return (
    <>
      <div className="flex w-full min-h-lvh">
        <div className="w-[200px] bg-zinc-900 p-10 flex-grow flex flex-col justify-between">
          <ul className="pt-5">
            {MENU.map((e) => (
              <li className="mb-3" key={e.url}>
                <Link
                  href={e.url}
                  className="text-sm flex items-center gap-1 rounded-lg px-1 py-1 text-white transition-all hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  <div className="flex gap-3 items-center justify-start">
                    <span>{e.icon}</span>
                    <span>{e.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <Signout />
          </div>
        </div>
        <div className="flex justify-center w-full relative">{children}</div>
      </div>
    </>
  )
}
