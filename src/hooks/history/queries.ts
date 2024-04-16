import HistoryService from './HistoryService'

export const ORDER_HISTORY_QUERY_KEYS = {
  all: ['order-history'] as const,
  detail: (date: Date) => [
    ...ORDER_HISTORY_QUERY_KEYS.all,
    new Date(date).toISOString(),
  ],
}

export const orderHistoryQueryOptions = {
  detail: ({ store_id, date }: { store_id: string; date: Date }) => ({
    queryKey: ORDER_HISTORY_QUERY_KEYS.detail(date),
    queryFn: () => HistoryService.getHistoryOrder({ store_id, date }),
  }),
}
