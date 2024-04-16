import StoreService from './StoreService'

export const STORE_QUERY_KEYS = {
  all: ['store'] as const,
}

export const storeQueryOptions = {
  all: () => ({
    queryKey: STORE_QUERY_KEYS.all,
    queryFn: () => StoreService.getStores(),
  }),
}
