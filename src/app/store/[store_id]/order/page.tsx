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
import { getRecommendProduct } from '@/hooks/query/useRecommendProduct'
import { Suspense } from 'react'
export default async function Order({
  searchParams,
  params,
}: {
  searchParams: { category: string }
  params: { store_id: string }
}) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.PRODUCT, 'recommend'],
    queryFn: () => getRecommendProduct(params.store_id),
  })
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.CATEGORY, searchParams.category],
    queryFn: () => getFilterByCategory(searchParams.category, params.store_id),
  })

  const dehydrateData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateData}>
      <div className="w-full flex justify-center ">
        <div className="flex flex-col gap-8 items-center w-full p-3  overflow-scroll mt-5 h-lvh">
          <Suspense fallback={<div>Recommend...</div>}>
            <RecommendList store_id={params.store_id} />
          </Suspense>
          <Suspense fallback={<div>Product List...</div>}>
            <ProductList
              category={searchParams.category}
              store_id={params.store_id}
            />
          </Suspense>
        </div>
        <div className="w-[40%]">
          <OrderList />
        </div>
      </div>
    </HydrationBoundary>
  )
}
