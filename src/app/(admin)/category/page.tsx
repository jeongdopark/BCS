import CategoryTable from '@/components/category/CategoryTable'
import Header from '@/components/category/Header'
import { getCategories } from '@/hooks/query/useCategoriesQuery'

import { QueryClient, dehydrate } from '@tanstack/query-core'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function Category() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['CATEGORY'],
    queryFn: getCategories,
  })

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <div className="w-[65%] mt-[100px] flex flex-col gap-5 ">
        <Header />
        <CategoryTable />
      </div>
    </HydrationBoundary>
  )
}
