import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import ProductService from './ProductService'
import queryOptions, { PRODUCT_QUERY_KEYS } from './queries'
import { IProductCreate } from '@/types/product'

export const useProduct = (product_id: string) => {
  return useSuspenseQuery(queryOptions.getProduct(product_id))
}

export const usePaginatedProducts = ({
  start,
  end,
  store_id,
}: {
  start: number
  end: number
  store_id: string
}) => {
  return useSuspenseQuery(
    queryOptions.getPaginatedProducts({ start, end, store_id }),
  )
}

export const useRecommendProducts = (store_id: string) => {
  return useSuspenseQuery(queryOptions.getRecommendProducts(store_id))
}

export const useFilterByCategory = ({
  category,
  store_id,
}: {
  category: string
  store_id: string
}) => {
  return useSuspenseQuery(
    queryOptions.getFilterByCategory({ category, store_id }),
  )
}

export const useAllProduct = (store_id: string) => {
  return useSuspenseQuery(queryOptions.getAllProducts(store_id))
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      name,
      price,
      image_src,
      description,
      category,
      store,
      tag,
    }: IProductCreate) =>
      ProductService.createProduct({
        name,
        price,
        image_src,
        description,
        category,
        store,
        tag,
      }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all })
    },
  })
}

export const useProductDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => ProductService.deleteProduct(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: PRODUCT_QUERY_KEYS.all,
      })
    },
  })
}
