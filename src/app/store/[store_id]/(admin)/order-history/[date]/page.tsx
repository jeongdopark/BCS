import { parse } from 'date-fns'
import OrderHistoryDetail from '@/components/order-history/OrderHistory'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { orderHistoryQueryOptions } from '@/hooks/history/queries'

export default async function OrderHistory({
  params,
}: {
  params: { store_id: string; date: string }
}) {
  const parsedDate = parse(params.date, 'yyyyMMdd', new Date())
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    orderHistoryQueryOptions.detail({
      store_id: params.store_id,
      date: parsedDate,
    }),
  )

  const dehydratedData = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedData}>
      <OrderHistoryDetail
        store_id={params.store_id}
        date={parsedDate}
        params_date={params.date}
      />
    </HydrationBoundary>
  )
}
