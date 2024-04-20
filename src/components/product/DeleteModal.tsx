'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import Modal from '../common/Modal'
import { DropdownMenuItem } from '../ui/dropdown-menu'
const DeleteModal = ({
  product,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
}: {
  product: any
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>
  isDeleteModalOpen: boolean
}) => {
  return (
    <Modal
      open={isDeleteModalOpen}
      setOpen={setIsDeleteModalOpen}
      title="카테고리 추가"
      trigger={<DropdownMenuItem>삭제</DropdownMenuItem>}
      InnerComponent={<div>삭제하시겠습니까 ?</div>}
    />
  )
}

export default DeleteModal
