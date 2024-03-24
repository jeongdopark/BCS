import { createCategory } from '@/actions/category'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) => createCategory(name),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
    },
  })
}

export default useCreateCategory
