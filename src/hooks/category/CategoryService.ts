import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'

class CategoryService {
  async getCategories(store_id: string): Promise<ICategory[] | null> {
    const { data, error } = await client.from('categories').select('id, name, english_name').eq('store', store_id)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data
  }

  async getPaginatedCategories({
    start,
    end,
    store_id,
  }: {
    start: number
    end: number
    store_id: string
  }): Promise<{ data: { name: string; id: number }[]; count: number | null }> {
    const { data, error, count } = await client.from('categories').select('id, name', { count: 'exact' }).eq('store', store_id).range(start, end)
    if (error) {
      throw console.error('Error fetching categories:', error)
    }

    return { data, count }
  }

  async createCategory({ name, english_name, store }: { name: string; english_name: string; store: string }) {
    await client.from('categories').insert({ name, english_name, store }).select()
  }

  async updateCategory({ name, id }: { name: string; id: number }) {
    await client.from('categories').update({ name }).eq('id', id).select()
  }

  async deleteCategory(id: number) {
    await client.from('categories').delete().eq('id', id)
  }
}

export default new CategoryService()
