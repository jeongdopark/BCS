import { client } from '@/utils/supabase'
import { IHistoryOrder } from '@/types/order'

class HistoryOrderService {
  async getHistoryOrder({
    store_id,
    date,
  }: {
    store_id: string
    date: Date
  }): Promise<IHistoryOrder[] | null> {
    const targetDate = new Date(date)
    targetDate.setDate(targetDate.getDate() + 1)

    let { data: order_history } = await client
      .from('order_history')
      .select('*')
      .eq('store_id', store_id)
      .gte('created_at', new Date(date).toISOString())
      .lte('created_at', targetDate.toDateString())
    return order_history
  }
}

export default new HistoryOrderService()
