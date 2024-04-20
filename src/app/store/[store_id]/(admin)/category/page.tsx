import CategoryTable from '@/components/category/CategoryTable'
import Header from '@/components/category/Header'
import TableFallback from '@/components/fallback/CategoryFallback'
import { PAGINATION } from '@/constants/constant'
import CategoryService from '@/hooks/category/CategoryService'
import { CATEGORY_QUERY_KEYS } from '@/hooks/category/queries'
import { QueryClient, dehydrate } from '@tanstack/query-core'
import { HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Category({
  searchParams,
  params,
}: {
  searchParams: { page: string }
  params: { store_id: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: CATEGORY_QUERY_KEYS.page(
      (Number(searchParams.page) - 1) * PAGINATION.CATEGORY,
    ),
    queryFn: () =>
      CategoryService.getPaginatedCategories({
        start: (Number(searchParams.page) - 1) * PAGINATION.CATEGORY,
        end: Number(searchParams.page) * PAGINATION.CATEGORY - 1,
        store_id: params.store_id,
      }),
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[80%] mt-[60px] flex flex-col gap-5 ">
        <Header store_id={params.store_id} />
        <Suspense fallback={<TableFallback />}>
          <CategoryTable
            current_page={Number(searchParams.page)}
            store_id={params.store_id}
          />
        </Suspense>
      </div>
    </HydrationBoundary>
  )
}
