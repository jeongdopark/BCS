import CategoryTable from '@/components/category/CategoryTable'
import Header from '@/components/category/Header'
import { PAGINATION } from '@/constants/constant'
import { getPaginatedCategories } from '@/hooks/query/usePaginatedCategories'

import { QueryClient, dehydrate } from '@tanstack/query-core'
import { HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Category({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['CATEGORY'],
    queryFn: () =>
      getPaginatedCategories(
        (Number(searchParams.page) - 1) * PAGINATION.CATEGORY,
        Number(searchParams.page) * PAGINATION.CATEGORY - 1,
      ),
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[65%] mt-[100px] flex flex-col gap-5 ">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryTable current_page={Number(searchParams.page)} />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
