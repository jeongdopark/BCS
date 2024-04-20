import ProductService from './ProductService'

export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  page: (page: number) => [...PRODUCT_QUERY_KEYS.all, page] as const,
  detail: (product_id: string) =>
    [...PRODUCT_QUERY_KEYS.all, product_id] as const,
  recommend_product: () => [...PRODUCT_QUERY_KEYS.all, 'recommend'] as const,
  filter_by_category: (category: string) => [
    ...PRODUCT_QUERY_KEYS.all,
    category,
  ],
}

const queryOptions = {
  getAllProducts: (store_id: string) => ({
    queryKey: PRODUCT_QUERY_KEYS.all,
    queryFn: () => ProductService.allProducts(store_id),
  }),
  getPaginatedProducts: ({
    start,
    end,
    store_id,
  }: {
    start: number
    end: number
    store_id: string
  }) => ({
    queryKey: PRODUCT_QUERY_KEYS.page(start),
    queryFn: () => ProductService.getPaginatedProducts(start, end, store_id),
  }),
  getRecommendProducts: (store_id: string) => ({
    queryKey: PRODUCT_QUERY_KEYS.recommend_product(),
    queryFn: () => ProductService.getRecommendProduct(store_id),
  }),
  getProduct: (product_id: string) => ({
    queryKey: PRODUCT_QUERY_KEYS.detail(product_id),
    queryFn: () => ProductService.getProduct(product_id),
  }),
  getFilterByCategory: ({
    store_id,
    category,
  }: {
    store_id: string
    category: string
  }) => ({
    queryKey: PRODUCT_QUERY_KEYS.filter_by_category(category),
    queryFn: () => ProductService.getFilterByCategory({ category, store_id }),
  }),
}

export default queryOptions
