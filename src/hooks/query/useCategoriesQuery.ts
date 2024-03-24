'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/utils/supabase'
import { ICategory } from '@/types/category'

export const getCategories = async (): Promise<ICategory[]> => {
  const { data, error } = await client.from('categories').select('id, name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

const useCategoriesQuery = () => {
  return useSuspenseQuery({ queryKey: ['CATEGORY'], queryFn: getCategories })
}

export default useCategoriesQuery
