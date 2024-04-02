'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/utils/supabase'
import { ICategory } from '@/types/category'

export const getCategories = async (store_id: string): Promise<ICategory[]> => {
  const { data, error } = await client
    .from('categories')
    .select('id, name')
    .eq('store', store_id)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

const useCategoriesQuery = (store_id: string) => {
  return useSuspenseQuery({
    queryKey: ['CATEGORY'],
    queryFn: () => getCategories(store_id),
  })
}

export default useCategoriesQuery
