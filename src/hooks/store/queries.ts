import StoreService from './StoreService'

export const STORE_QUERY_KEYS = {
  all: ['store'] as const,
  detail: (store_id:string) => [...STORE_QUERY_KEYS.all, store_id] as const
}

export const storeQueryOptions = {
  all: () => ({
    queryKey: STORE_QUERY_KEYS.all,
    queryFn: () => StoreService.getStores(),
  }),
  detail: (store_id:string) => ({
    queryKey: STORE_QUERY_KEYS.detail(store_id),
    queryFn: () => StoreService.getStore(store_id),
  }),
}
