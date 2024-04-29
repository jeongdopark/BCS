import CategoryList from '@/components/order/CategoryList'
import categoryQueryOptions from '@/hooks/category/queries'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function Category({ params }: { params: { store_id: string } }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(categoryQueryOptions.all(params.store_id))

  const dehydrateData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense>
        <CategoryList store_id={params.store_id} />
      </Suspense>
    </HydrationBoundary>
  )
}
