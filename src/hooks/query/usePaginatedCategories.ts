import { QUERY_KEY } from '@/constants/constant'
import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getPaginatedCategories = async (
  start: number,
  end: number,
): Promise<{ data: { name: string; id: number }[]; count: number | null }> => {
  const { data, error, count } = await client
    .from('categories')
    .select('id, name', { count: 'exact' })
    .range(start, end)
  console.log(data)

  if (error) {
    throw console.error('Error fetching categories:', error)
  }

  return { data, count }
}

export const usePaginatedCategories = (start: number, end: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.CATEGORY, start],
    queryFn: () => getPaginatedCategories(start, end),
  })
}
