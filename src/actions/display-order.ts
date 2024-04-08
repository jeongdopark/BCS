import { client } from '@/utils/supabase'

export const orderUpdate = async (
  status: 'complete' | 'cancel',
  order_id: number,
) => {
  const { data, error } = await client
    .from('display_order')
    .update({ status })
    .eq('id', order_id)
    .select()
  console.log(data)
  console.log(error)
}
