import CategoryList from '@/components/order/CategoryList'
import { QUERY_KEY } from '@/constants/constant'
import { getCategories } from '@/hooks/query/useCategoriesQuery'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Category() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.CATEGORY],
    queryFn: getCategories,
  })

  const dehydrateData = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryList />
      </Suspense>
    </HydrationBoundary>
  )
}
