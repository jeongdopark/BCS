'use client'
import { client } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'

export interface IOrder {
  status: 'receive' | 'complete' | 'cancel'
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

const getDisplayOrder = async (store_id: string): Promise<IDisplayOrder> => {
  return await client.from('display_order').select('*').eq('store_id', store_id)
}

export const useDisplayOrderQuery = (store_id: string) => {
  return useQuery({
    queryKey: ['DISPLAY_ORDER'],
    queryFn: () => getDisplayOrder(store_id),
  })
}