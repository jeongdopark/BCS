import { deleteCategory } from '@/actions/category'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCategoryDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
    },
  })
}

export default useCategoryDelete
