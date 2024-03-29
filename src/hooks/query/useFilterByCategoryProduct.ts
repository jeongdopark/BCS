'use client'

import { QUERY_KEY } from '@/constants/constant'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getFilterByCategory = async (category: string) => {
  let { data: products, error } = await client
    .from('products')
    .select(`*, category!inner(*)`)
    .eq('category.english_name', category)

  return products
}

export const useFilterByCategory = (category: string) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.PRODUCT, category],
    queryFn: () => getFilterByCategory(category),
  })
}
