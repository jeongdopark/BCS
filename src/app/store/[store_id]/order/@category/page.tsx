import CategoryFallback from '@/components/fallback/CategoryFallback'
import CategoryList from '@/components/order/CategoryList'
import CategoryService from '@/hooks/category/CategoryService'
import { CATEGORY_QUERY_KEYS } from '@/hooks/category/queries'
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
    queryKey: CATEGORY_QUERY_KEYS.all,
    queryFn: () => CategoryService.getCategories(params.store_id),
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
