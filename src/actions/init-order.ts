import Toast from '@/components/common/Toast'
import { client } from '@/utils/supabase'

export const initOrder = async (store_id: string) => {
  await client
    .from('display_order')
    .delete()
    .eq('store_id', store_id)
    .then(() =>
      Toast({
        title: '초기화',
        description: '주문 현황 초기화 완료',
        mode: 'success',
      }),
    )
}
