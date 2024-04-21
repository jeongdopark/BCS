import ProductModal from '@/components/order/ProductModal'
import queryOptions from '@/hooks/product/queries'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'

interface IParams {
  params: {
    id: string
  }
}

export default async function Modal({ params }: IParams) {
  const PRODUCT_ID = params.id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(queryOptions.getProduct(PRODUCT_ID))

  const dehydrateData = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductModal id={PRODUCT_ID} />
      </Suspense>
    </HydrationBoundary>
  )
}
