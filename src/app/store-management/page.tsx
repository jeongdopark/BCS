import StoreManagementFallback from '@/components/fallback/StoreManagementFallback'
import Header from '@/components/store/Header'
import StoreTable from '@/components/store/StoreTable'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { storeQueryOptions } from '@/hooks/store/queries'

export default async function StoreManagement() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(storeQueryOptions.all())

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
