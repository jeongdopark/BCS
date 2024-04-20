import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { STORE_QUERY_KEYS, storeQueryOptions } from './queries'
import StoreService from './StoreService'

export const useStore = () => {
  return useSuspenseQuery(storeQueryOptions.all())
}

export const useCreateStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, user_id }: { name: string; user_id: string }) =>
      StoreService.createStore({ user_id, name }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: STORE_QUERY_KEYS.all })
    },
  })
}

export const useUpdateStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, id }: { name: string; id: number }) =>
      StoreService.updateStore({ name, id }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: STORE_QUERY_KEYS.all })
    },
  })
}
