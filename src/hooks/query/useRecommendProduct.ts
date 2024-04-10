import { QUERY_KEY } from '@/constants/constant'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getRecommendProduct = async (store_id: string) => {
  let { data: products } = await client
    .from('products')
    .select('*')
    .eq('store', store_id)
    .eq('tag', 'recommend')

  return products
}

export const useRecommendProduct = (store_id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.PRODUCT, 'recommend'],
    queryFn: () => getRecommendProduct(store_id),
  })
}
