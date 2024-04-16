import CategoryService from './CategoryService'

export const CATEGORY_QUERY_KEYS = {
  all: ['categories'] as const,
  page: (page: number) => [...CATEGORY_QUERY_KEYS.all, page] as const,
}

const categoryQueryOptions = {
  all: (store_id: string) => ({
    queryKey: CATEGORY_QUERY_KEYS.all,
    queryFn: () => CategoryService.getCategories(store_id),
  }),
  getPaginatedCategories: ({
    start,
    end,
    store_id,
  }: {
    start: number
    end: number
    store_id: string
  }) => ({
    queryKey: CATEGORY_QUERY_KEYS.page(start),
    queryFn: () =>
      CategoryService.getPaginatedCategories({ start, end, store_id }),
  }),
}

export default categoryQueryOptions
