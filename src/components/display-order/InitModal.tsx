import { useState } from 'react'
import Modal from '../common/Modal'
import InitOrder from './InitOrder'
import { Button } from '@/components/ui/button'

const InitModal = ({ store_id }: { store_id: string }) => {
  const [open, setOpen] = useState(false)
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="초기화"
      trigger={<Button size="lg">초기화</Button>}
      InnerComponent={<InitOrder store_id={store_id} setOpen={setOpen} />}
    />
  )
}

export default InitModal
