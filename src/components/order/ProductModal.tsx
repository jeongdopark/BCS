'use client'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useProductQuery } from '@/hooks/query/useProductQuery'
import TabTypeOption from './TabTypeOption'
import CheckTypeOption from './CheckTypeOption'
import { useState } from 'react'

interface IProps {
  id: string
}
const ProductModal = ({ id }: IProps) => {
  const router = useRouter()
  const { data } = useProductQuery(id)
  const [count, setCount] = useState(1)
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <div className="flex gap-5">
          <div className="rounded-md relative w-[100px] h-[100px] overflow-hidden">
            <Image src={data[0].image_src} fill alt="product" />
          </div>
          <div className="flex flex-col gap-1">
            <strong>{data[0].name}</strong>
            <strong>{data[0].price.toLocaleString()}원</strong>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => setCount((prev) => prev - 1)}
                className="rounded-lg "
              >
                <FiMinus />
              </Button>
              <span>{count}</span>
              <Button
                size="sm"
                onClick={() => setCount((prev) => prev + 1)}
                className="rounded-lg"
              >
                <FiPlus />
              </Button>
            </div>
          </div>
        </div>
        <div>{data[0].description}</div>
        {data[0].options &&
          data[0].options.map((option) => {
            return (
              <div>
                <strong>{option.name}</strong>
                {option.type === 'select' ? (
                  <TabTypeOption option={option} />
                ) : (
                  <CheckTypeOption option={option} />
                )}
              </div>
            )
          })}
        <div className="flex gap-2 flex-grow">
          <DialogTrigger asChild>
            <Button
              className="flex-1"
              onClick={() => {
                router.back()
              }}
            >
              선택
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              className="flex-1"
              onClick={() => {
                router.back()
              }}
            >
              닫기
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
