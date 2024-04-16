import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import categoryQueryOptions, { CATEGORY_QUERY_KEYS } from './queries'
import CategoryService from './CategoryService'

export const useCategories = (store_id: string) => {
  return useSuspenseQuery(categoryQueryOptions.all(store_id))
}

export const usePaginatedCategories = ({
  start,
  end,
  store_id,
}: {
  start: number
  end: number
  store_id: string
}) => {
  return useSuspenseQuery(
    categoryQueryOptions.getPaginatedCategories({ start, end, store_id }),
  )
}

export const useCategoryDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => CategoryService.deleteCategory(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: CATEGORY_QUERY_KEYS.all,
      })
    },
  })
}

export const useCategoryUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, id }: { name: string; id: number }) =>
      CategoryService.updateCategory({ name, id }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: CATEGORY_QUERY_KEYS.all,
      })
    },
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      name,
      english_name,
      store,
    }: {
      name: string
      english_name: string
      store: string
    }) => CategoryService.createCategory({ name, english_name, store }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: CATEGORY_QUERY_KEYS.all,
      })
    },
  })
}
