import Header from '@/components/product/Header'
import ProductTable from '@/components/product/ProductTable'
import { PAGINATION, QUERY_KEY } from '@/constants/constant'
import { getPaginatedCategories } from '@/hooks/query/usePaginatedCategories'
import { getPaginatedProducts } from '@/hooks/query/usePaginatedProducts'
import { client } from '@/utils/supabase'

import { QueryClient, dehydrate } from '@tanstack/query-core'
import { HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Product({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.PRODUCT],
    queryFn: () =>
      getPaginatedProducts(
        (Number(searchParams.page) - 1) * PAGINATION.CATEGORY,
        Number(searchParams.page) * PAGINATION.CATEGORY - 1,
      ),
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[65%] mt-[60px] flex flex-col gap-5 ">
        <Header />
        <Suspense fallback={<div>Product Loading...</div>}>
          <ProductTable current_page={Number(searchParams.page)} />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
