import TableFallback from '@/components/fallback/CategoryFallback'
import Header from '@/components/product/Header'
import ProductTable from '@/components/product/ProductTable'
import { PAGINATION, QUERY_KEY } from '@/constants/constant'
import { getPaginatedProducts } from '@/hooks/query/usePaginatedProducts'

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
    queryKey: [QUERY_KEY.PRODUCT],
    queryFn: () =>
      getPaginatedProducts(
        (Number(searchParams.page) - 1) * PAGINATION.PRODUCT,
        Number(searchParams.page) * PAGINATION.PRODUCT - 1,
        params.store_id,
      ),
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[65%] mt-[60px] flex flex-col gap-5 ">
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
