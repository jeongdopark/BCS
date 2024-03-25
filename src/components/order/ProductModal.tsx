'use client'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useProductQuery } from '@/hooks/query/useProductQuery'

interface IProps {
  id: string
}

const ProductModal = ({ id }: IProps) => {
  const router = useRouter()
  const { data, error } = useProductQuery(id)

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
            <div className="flex items-center gap-1">
              <FiMinus />
              <span>1</span>
              <FiPlus />
            </div>
          </div>
        </div>
        <div>{data[0].description}</div>

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
