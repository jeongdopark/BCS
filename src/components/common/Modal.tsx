import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { Dispatch, SetStateAction } from 'react'

interface IProps {
  trigger: React.ReactElement
  title: string
  InnerComponent: React.ReactElement
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
  unique_key?: any
}

const Modal = ({
  title,
  trigger,
  InnerComponent,
  open,
  setOpen,
  unique_key,
}: IProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} key={unique_key}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent key={unique_key}>
        <DialogHeader>
          <DialogTitle className="mb-5">{title}</DialogTitle>
          <DialogDescription>{InnerComponent}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
