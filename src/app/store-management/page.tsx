import StoreManagementFallback from '@/components/fallback/StoreManagementFallback'
import Header from '@/components/store/Header'
import StoreTable from '@/components/store/StoreTable'
import { getStores } from '@/hooks/query/useStoreQuery'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

export default async function StoreManagement() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['STORE'],
    queryFn: () => getStores(),
  })

  const dehydrateData = dehydrate(queryClient)
  return (
    <div className="w-full flex justify-center">
      <div className="w-[65%] mt-[60px] flex flex-col gap-5 ">
        <Header />
        <HydrationBoundary state={dehydrateData}>
          <Suspense fallback={<StoreManagementFallback />}>
            <StoreTable />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  )
}
