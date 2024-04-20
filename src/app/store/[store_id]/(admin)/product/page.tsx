import TableFallback from '@/components/fallback/CategoryFallback'
import Header from '@/components/product/Header'
import ProductTable from '@/components/product/ProductTable'
import { PAGINATION } from '@/constants/constant'
import ProductService from '@/hooks/product/ProductService'
import { PRODUCT_QUERY_KEYS } from '@/hooks/product/queries'

import { QueryClient, dehydrate } from '@tanstack/query-core'
import { HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Product({
  searchParams,
  params,
}: {
  params: { store_id: string }
  searchParams: { page: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: PRODUCT_QUERY_KEYS.page(
      (Number(searchParams.page) - 1) * PAGINATION.PRODUCT,
    ),
    queryFn: () =>
      ProductService.getPaginatedProducts(
        (Number(searchParams.page) - 1) * PAGINATION.PRODUCT,
        Number(searchParams.page) * PAGINATION.PRODUCT - 1,
        params.store_id,
      ),
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[80%] mt-[60px] flex flex-col gap-5 ">
        <Header store_id={params.store_id} />
        <Suspense fallback={<TableFallback />}>
          <ProductTable
            current_page={Number(searchParams.page)}
            store_id={params.store_id}
          />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
