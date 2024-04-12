import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getPaginatedProducts = async (
  start: number,
  end: number,
  store_id: string,
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
    .select('*, category(name)', {
      count: 'exact',
    })
    .eq('store', store_id)
    .range(start, end)
  if (error) {
    throw new Error(error.message)
  }
  return { data, count }
}

export const usePaginatedProducts = (
  start: number,
  end: number,
  store_id: string,
) => {
  return useSuspenseQuery({
    queryKey: ['PRODUCT', start, store_id],
    queryFn: () => getPaginatedProducts(start, end, store_id),
  })
}
