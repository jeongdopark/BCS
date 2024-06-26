'use client'
import { Button } from '../ui/button'
import Modal from '../common/Modal'
import { useState } from 'react'
import StoreForm from './StoreForm'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="w-full flex justify-between items-center">
      <strong className="text-2xl">매장 관리</strong>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="매장 생성"
        trigger={<Button size="lg">생성</Button>}
        InnerComponent={<StoreForm setIsModalOpen={setIsModalOpen} />}
      />
    </header>
  )
}

export default Header
