import { createCategory } from '@/actions/category'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createProduct } from '@/actions/product'
interface IProduct {
  name: string
  category: string
  price: number
  description: string
  image_src: string
  store: string
  tag: 'recommend'
}

const useCreateProduct = () => {
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
    }: IProduct) =>
      createProduct({
        name,
        price,
        image_src,
        description,
        category,
        store,
        tag,
      }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['PRODUCT'] })
    },
    onError: (error) => {
      return console.error(error)
    },
  })
}

export default useCreateProduct
