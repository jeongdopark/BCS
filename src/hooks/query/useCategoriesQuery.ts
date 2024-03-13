'use client'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/utils/supabase'
import { ICategory } from '@/types/category'

export const getCategories = async (): Promise<ICategory[]> => {
  const { data, error } = await client.from('category').select('id, name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

const useCategoriesQuery = () => {
  return useQuery({ queryKey: ['CATEGORY'], queryFn: getCategories })
}

export default useCategoriesQuery
