import { client } from '@/utils/supabase'

interface IOrderHistory {
  store_id: string
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
  price: number
  takeout: boolean
}

export const createOrderHistory = async ({
  store_id,
  orders,
  price,
  takeout,
}: IOrderHistory) => {
  const { data, error } = await client
    .from('order_history')
    .insert([
      {
        store_id,
        orders,
        price,
        takeout,
      },
    ])
    .select()
}
