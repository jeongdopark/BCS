'use client'
import { Button } from '../ui/button'
import Modal from '../common/Modal'
import { useState } from 'react'
import CategoryForm from './CategoryForm'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <header className="w-full flex justify-between items-center">
      <strong className="text-2xl">카테고리</strong>
      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title="카테고리 추가"
        trigger={<Button size="lg">추가</Button>}
        InnerComponent={
          <CategoryForm setIsModalOpen={setIsModalOpen} mode="create" />
        }
      />
    </header>
  )
}

export default Header
