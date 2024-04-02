'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/utils/supabase'
import { useUserStore } from '@/stores/user'

export const getStores = async () => {
  const user_id = localStorage.getItem('user_id')

  const { data, error } = await client
    .from('store')
    .select()
    .eq('user_id', user_id)

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

const useStoreQuery = () => {
  return useSuspenseQuery({ queryKey: ['STORE'], queryFn: getStores })
}

export default useStoreQuery