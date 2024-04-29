import ProductList from '@/components/order/ProductList'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'
import ProductListFallback from '@/components/fallback/ProductListFallback'
import queryOptions from '@/hooks/product/queries'

export default async function Product({ searchParams, params }: { searchParams: { category: string }; params: { store_id: string } }) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryOptions.getAllProducts(params.store_id))

  await queryClient.prefetchQuery(
    queryOptions.getFilterByCategory({
      category: searchParams.category,
      store_id: params.store_id,
    }),
  )

  const dehydrateData = dehydrate(queryClient)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log('hello'))
    }, 2000)
  })
  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<ProductListFallback />}>
        <ProductList category={searchParams.category} store_id={params.store_id} />
      </Suspense>
    </HydrationBoundary>
  )
}
