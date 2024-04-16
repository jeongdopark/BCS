import { useQuery } from '@tanstack/react-query'
import { orderHistoryQueryOptions } from './queries'

export const useOrderHistory = ({
  store_id,
  date,
}: {
  store_id: string
  date: Date
}) => {
  return useQuery(orderHistoryQueryOptions.detail({ store_id, date }))
}
