import RecommendList from '@/components/order/RecommendList'
import ProductList from '@/components/order/ProductList'
import OrderList from '@/components/order/OrderList'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import RecommendFallback from '@/components/fallback/RecommendFallback'
import ProductListFallback from '@/components/fallback/ProductListFallback'
import queryOptions from '@/hooks/product/queries'

export default async function Order({
  searchParams,
  params,
}: {
  searchParams: { category: string }
  params: { store_id: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    queryOptions.getRecommendProducts(params.store_id),
  )
  await queryClient.prefetchQuery(queryOptions.getAllProducts(params.store_id))

  await queryClient.prefetchQuery(
    queryOptions.getFilterByCategory({
      category: searchParams.category,
      store_id: params.store_id,
    }),
  )

  const dehydrateData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateData}>
      <div className="w-full flex justify-center ">
        <div className="flex flex-col gap-8 items-center w-[70%] p-3  overflow-scroll mt-5 h-lvh">
          <Suspense fallback={<RecommendFallback />}>
            <RecommendList store_id={params.store_id} />
          </Suspense>
          <Suspense fallback={<ProductListFallback />}>
            <ProductList
              category={searchParams.category}
              store_id={params.store_id}
            />
          </Suspense>
        </div>
        <div className="w-[30%]">
          <OrderList store_id={params.store_id} />
        </div>
      </div>
    </HydrationBoundary>
  )
}
