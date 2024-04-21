import { client } from '@/utils/supabase'
import { IDisplayOrder } from '@/types/order'

class DisplayOrderService {
  async getDisplayOrder(store_id: string): Promise<IDisplayOrder[] | null> {
    const { data } = await client
      .from('display_order')
      .select('*')
      .eq('store_id', store_id)
    return data
  }
}

export default new DisplayOrderService()
