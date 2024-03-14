'use client'
import { Button } from '../ui/button'
import Modal from '../common/Modal'
import { useState } from 'react'
import ProductForm from './ProductForm'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="w-full flex justify-between items-center">
      <strong className="text-2xl">상품</strong>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="상품 추가"
        trigger={<Button size="lg">추가</Button>}
        InnerComponent={<ProductForm />}
      />
    </header>
  )
}

export default Header