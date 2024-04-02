import { createStore } from '@/actions/store'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const useCreateStore = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, user_id }: { name: string; user_id: string }) =>
      createStore({ user_id, name }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['STORE'] })
    },
  })
}

export default useCreateStore
