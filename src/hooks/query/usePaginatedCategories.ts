import { client } from '@/utils/supabase'
import { useSuspenseQuery } from '@tanstack/react-query'

export const getPaginatedCategories = async (
  start: number,
  end: number,
): Promise<{ data: { name: string; id: number }[]; count: number | null }> => {
  const { data, error, count } = await client
    .from('category')
    .select('id, name', { count: 'exact' })
    .range(start, end)

  if (error) {
    throw console.error('Error fetching categories:', error)
  }

  return { data, count }
}

export const usePaginatedCategories = (start: number, end: number) => {
  return useSuspenseQuery({
    queryKey: ['CATEGORY', start],
    queryFn: () => getPaginatedCategories(start, end),
  })
}
