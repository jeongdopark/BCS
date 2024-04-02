import { createCategory } from '@/actions/category'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCreateCategory = () => {
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
    }) => createCategory({ name, english_name, store }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
    },
  })
}

export default useCreateCategory
