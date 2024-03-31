import ProductModal from '@/components/order/ProductModal'
import { QUERY_KEY } from '@/constants/constant'
import { getProduct } from '@/hooks/query/useProductQuery'
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
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.PRODUCT, PRODUCT_ID],
    queryFn: () => getProduct(PRODUCT_ID),
  })

  const dehydrateData = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydrateData}>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductModal id={PRODUCT_ID} />
      </Suspense>
    </HydrationBoundary>
  )
}
