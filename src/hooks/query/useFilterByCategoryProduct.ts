import { QUERY_KEY } from '@/constants/constant'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getFilterByCategory = async (
  category: string,
  store_id: string,
) => {
  let { data: products, error } = await client
    .from('products')
    .select(`*, category!inner(*)`)
    .eq('store', store_id)
    .eq('category.english_name', category)

  return products
}

export const useFilterByCategory = (category: string, store_id: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.PRODUCT, category],
    queryFn: () => getFilterByCategory(category, store_id),
  })
}
