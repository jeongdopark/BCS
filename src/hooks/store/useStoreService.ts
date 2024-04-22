import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { STORE_QUERY_KEYS, storeQueryOptions } from './queries'
import StoreService from './StoreService'

export const useStore = () => {
  return useQuery(storeQueryOptions.all())
}

export const useStoreInfo = (store_id:string) => {
  return useQuery(storeQueryOptions.detail(store_id))
}

export const useCreateStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, user_id, toss_client_key }: { name: string; user_id: string, toss_client_key:string }) =>
      StoreService.createStore({ user_id, name, toss_client_key }),
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
