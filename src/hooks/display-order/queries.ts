import DisplayOrderService from './DisplayOrderService'

export const DISPLAY_ORDER_QUERY_KEYS = {
  all: ['display-order'] as const,
}

export const displayOrderQueryOptions = {
  all: (store_id: string) => ({
    queryKey: DISPLAY_ORDER_QUERY_KEYS.all,
    queryFn: () => DisplayOrderService.getDisplayOrder(store_id),
  }),
}
