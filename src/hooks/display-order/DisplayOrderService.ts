import { client } from '@/utils/supabase'

export interface IOrder {
  takeout: boolean
  status: 'receive' | 'complete' | 'cancel'
  created_at: Date
  end_at: Date | null
  id: number
  orders: {
    uid: any
    count: number
    product_id: string
    product_name: string
    options: {
      name: string
      option: string
      price: number
    }[]
  }[]
}

export interface IDisplayOrder {
  data: IOrder[] | null
  count: number | null
}

class DisplayOrderService {
  async getDisplayOrder(store_id: string): Promise<IDisplayOrder> {
    return await client
      .from('display_order')
      .select('*')
      .eq('store_id', store_id)
  }
}

export default new DisplayOrderService()
