import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { initOrder } from '@/actions/init-order'
import Toast from '../common/Toast'

const InitOrder = ({
  store_id,
  setOpen,
}: {
  store_id: string
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <>
      <div>초기화 하시겠습니까 ?</div>
      <div className="flex justify-end">
        <Button
          size="lg"
          onClick={() => {
            initOrder(store_id)
            Toast({
              title: '초기화',
              description: '초기화 완료',
              mode: 'success',
            })
            setOpen(false)
          }}
        >
          확인
        </Button>
      </div>
    </>
  )
}

export default InitOrder
