import RecommendList from '@/components/order/RecommendList'
import ProductList from '@/components/order/ProductList'
import OrderList from '@/components/order/OrderList'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { QUERY_KEY } from '@/constants/constant'
import { getFilterByCategory } from '@/hooks/query/useFilterByCategoryProduct'
import { Suspense } from 'react'
export default async function Order({
  searchParams,
}: {
  searchParams: { category: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.CATEGORY, searchParams.category],
    queryFn: () => getFilterByCategory(searchParams.category),
  })

  const dehydrateData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateData}>
      <div className="w-full flex justify-center ">
        <div className="flex flex-col gap-8 items-center w-full p-3  overflow-scroll mt-5 h-lvh">
          <RecommendList />
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList category={searchParams.category} />
          </Suspense>
        </div>
        <div className="w-[40%]">
          <OrderList />
        </div>
      </div>
    </HydrationBoundary>
  )
}
