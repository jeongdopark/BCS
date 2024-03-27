import { QUERY_KEY } from '@/constants/constant'
import { IProduct } from '@/types/product'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getProduct = async (id: string): Promise<IProduct[]> => {
  const { data } = await client
    .from('products')
    .select('*, options')
    .eq('id', id)
  return data!
}

export const useProductQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.PRODUCT, id],
    queryFn: () => getProduct(id),
  })
}
