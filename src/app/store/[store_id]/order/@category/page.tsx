import CategoryFallback from '@/components/fallback/CategoryFallback'
import CategoryList from '@/components/order/CategoryList'
import { QUERY_KEY } from '@/constants/constant'
import { getCategories } from '@/hooks/query/useCategoriesQuery'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Category({
  params,
}: {
  params: { store_id: string }
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.CATEGORY],
    queryFn: () => getCategories(params.store_id),
  })

  const dehydrateData = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<CategoryFallback />}>
        <CategoryList store_id={params.store_id} />
      </Suspense>
    </HydrationBoundary>
  )
}
