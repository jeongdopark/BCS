import { client } from '@/utils/supabase'
import { getUserId } from '@/actions/getUserId'
class HistoryOrderService {
  async getStores() {
    const user_id = await getUserId()
    const { data, error } = await client
      .from('store')
      .select()
      .eq('user_id', user_id!.value)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data
  }

  async createStore({ name, user_id }: { name: string; user_id: string }) {
    await client.from('store').insert([{ name, user_id }]).select()
  }

  async updateStore({ name, id }: { name: string; id: number }) {
    await client.from('store').update({ name }).eq('id', id).select()
  }
}

export default new HistoryOrderService()
