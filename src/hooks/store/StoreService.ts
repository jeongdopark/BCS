import { useUserStore } from '@/stores/user'
import { client } from '@/utils/supabase'

class HistoryOrderService {
  async getStores() {
    const user_info = useUserStore((state: any) => state.user_info)
    const { data, error } = await client
      .from('store')
      .select()
      .eq('user_id', user_info.data.session.user.id)

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    return data
  }
}

export default new HistoryOrderService()
