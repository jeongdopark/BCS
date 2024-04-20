import { client } from '@/utils/supabase'

interface IDisplayOrder {
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
  status: 'receive' | 'complete' | 'cancel'
  store_id: string
  takeout: boolean
}

export const orderUpdate = async (
  status: 'complete' | 'cancel',
  order_id: number,
) => {
  const { data, error } = await client
    .from('display_order')
    .update({ status })
    .eq('id', order_id)
    .select()
}

export const createOrderDisplay = async ({
  orders,
  status,
  store_id,
  takeout,
}: IDisplayOrder) => {
  const { data, error } = await client
    .from('display_order')
    .insert([{ orders, status, store_id, takeout }])
    .select()
}
