import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getPaginatedProducts = async (
  start: number,
  end: number,
): Promise<{
  data:
    | {
        name: string
        id: number
        description: string
        image_src: string
        category: ICategory
        price: number
      }[]
    | null
  count: number | null
}> => {
  let { data, error, count } = await client
    .from('products')
    .select('*', {
      count: 'exact',
    })
    .range(start, end)
  if (error) {
    throw new Error(error.message)
  }
  return { data, count }
}

export const usePaginatedProducts = (start: number, end: number) => {
  return useSuspenseQuery({
    queryKey: ['PRODUCT', start],
    queryFn: () => getPaginatedProducts(start, end),
  })
}
