import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import ProductService from './ProductService'
import queryOptions, { PRODUCT_QUERY_KEYS } from './queries'
import { IPaginationProduct, IProductCreate } from '@/types/product'

export const useProduct = (product_id: string) => {
  return useSuspenseQuery(queryOptions.getProduct(product_id))
}

export const usePaginatedProducts = ({ start, end, store_id }: { start: number; end: number; store_id: string }) => {
  return useSuspenseQuery(queryOptions.getPaginatedProducts({ start, end, store_id }))
}

export const useRecommendProducts = (store_id: string) => {
  return useSuspenseQuery(queryOptions.getRecommendProducts(store_id))
}

export const useFilterByCategory = ({ category, store_id }: { category: string; store_id: string }) => {
  return useSuspenseQuery(queryOptions.getFilterByCategory({ category, store_id }))
}

export const useAllProduct = (store_id: string) => {
  return useSuspenseQuery(queryOptions.getAllProducts(store_id))
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, price, image_src, description, category, store, tag, is_display, is_sold_out }: IProductCreate) =>
      ProductService.createProduct({
        name,
        price,
        image_src,
        description,
        category,
        store,
        tag,
        is_display,
        is_sold_out,
      }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.all })
    },
  })
}

export const useUpdateProductDisplay = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ product_id, current_status, page }: { product_id: string; current_status: boolean; page: number }) =>
      ProductService.updateProductDisplay({ product_id, current_status }),
    onMutate: async (variables) => {
      const prev: IPaginationProduct | undefined = queryClient.getQueryData(PRODUCT_QUERY_KEYS.page(variables.page))
      const new_data = prev!.data.map((product) => {
        if (product.id === variables.product_id) return { ...product, is_display: product.is_display ? false : true }
        else return product
      })
      queryClient.setQueryData(PRODUCT_QUERY_KEYS.page(variables.page), { count: prev?.count, data: new_data })
      return { prev }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([PRODUCT_QUERY_KEYS.page(variables.page)], context?.prev)
    },
    onSettled: (err, _, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.page(variables.page) })
    },
  })
}

export const useUpdateProductSoldOut = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ product_id, current_status, page }: { product_id: string; current_status: boolean; page: number }) =>
      ProductService.updateProductSoldOut({ product_id, current_status }),
    onMutate: async (variables) => {
      const prev: IPaginationProduct | undefined = queryClient.getQueryData(PRODUCT_QUERY_KEYS.page(variables.page))
      const new_data = prev!.data.map((product) => {
        if (product.id === variables.product_id) return { ...product, is_sold_out: product.is_sold_out ? false : true }
        else return product
      })
      queryClient.setQueryData(PRODUCT_QUERY_KEYS.page(variables.page), { count: prev?.count, data: new_data })
      return { prev }
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData([PRODUCT_QUERY_KEYS.page(variables.page)], context?.prev)
    },
    onSettled: (err, _, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.page(variables.page) })
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
