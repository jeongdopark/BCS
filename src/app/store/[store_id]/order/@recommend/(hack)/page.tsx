import RecommendList from '@/components/order/RecommendList'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'
import RecommendFallback from '@/components/fallback/RecommendFallback'
import queryOptions from '@/hooks/product/queries'

export default async function Recommend({ params }: { params: { store_id: string } }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryOptions.getRecommendProducts(params.store_id))

  const dehydrateData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<RecommendFallback />}>
        <RecommendList store_id={params.store_id} />
      </Suspense>
    </HydrationBoundary>
  )
}
