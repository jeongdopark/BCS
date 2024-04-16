import { useQuery } from '@tanstack/react-query'
import { displayOrderQueryOptions } from './queries'

export const useDisplayOrder = (store_id: string) => {
  return useQuery(displayOrderQueryOptions.all(store_id))
}
