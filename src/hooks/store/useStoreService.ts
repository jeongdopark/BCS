import { useSuspenseQuery } from '@tanstack/react-query'
import { storeQueryOptions } from './queries'

export const useStore = () => {
  return useSuspenseQuery(storeQueryOptions.all())
}
