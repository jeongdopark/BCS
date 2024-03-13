'use client'
import { Button } from '../ui/button'
import Modal from '../common/Modal'
import { useState } from 'react'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="w-full flex justify-between items-center">
      <strong className="text-2xl">상품</strong>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="카테고리 추가"
        trigger={<Button size="lg">추가</Button>}
        InnerComponent={<div>Create Product</div>}
      />
    </header>
  )
}

export default Header
