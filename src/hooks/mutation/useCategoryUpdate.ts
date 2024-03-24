import { updateCategory } from '@/actions/category'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCategoryUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, id }: { name: string; id: number }) =>
      updateCategory({ name, id }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
    },
  })
}

export default useCategoryUpdate
