'use client'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useProduct } from '@/hooks/product/useProductService'
import TabTypeOption from './TabTypeOption'
import CheckTypeOption from './CheckTypeOption'
import { useRef, useState } from 'react'
import { useOrderStore } from '@/stores/order'

interface IProps {
  id: string
}
interface seletedOption {
  name: string
  option: string
  price: number
}

const ProductModal = ({ id }: IProps) => {
  const addOrder = useOrderStore((state: any) => state.addOrder)
  const addAmount = useOrderStore((state: any) => state.addAmount)
  const { data } = useProduct(id)
  const router = useRouter()
  const PRODUCT_PRICE = useRef(data.price)
  const UID = Math.random() * 1000
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(data.price)
  const [selectedOptions, setSelectedOptions] = useState<seletedOption[]>([])

  const isExistOption = (seletedOptions: seletedOption[], name: string) => {
    for (let i = 0; i < seletedOptions.length; i++) {
      if (seletedOptions[i].name === name) return true
    }
    return false
  }

  const handleTabOptionUpdate = ({
    option,
    price,
    name,
  }: {
    option: string
    name: string
    price: number
  }) => {
    if (selectedOptions.length > 0) {
      // 이미 옵션 선택을 했을 경우
      if (isExistOption(selectedOptions, name)) {
        setSelectedOptions(
          selectedOptions.map((_option) =>
            name === _option.name ? { option, price, name } : _option,
          ),
        )
      } else {
        setSelectedOptions([...selectedOptions, { option, price, name }])
      }
    } else {
      setSelectedOptions([...selectedOptions, { option, price, name }])
    }
  }

  const handleCheckOptionUpdate = ({
    option,
    price,
    name,
  }: {
    option: string
    name: string
    price: number
  }) => {
    if (selectedOptions.length > 0) {
      if (isExistOption(selectedOptions, name)) {
        setSelectedOptions((options) =>
          options.filter((option) => option.name !== name),
        )
      } else {
        setSelectedOptions([...selectedOptions, { name, price, option }])
      }
    } else {
      setSelectedOptions([...selectedOptions, { name, price, option }])
    }
  }

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-md">
        <div className="flex gap-5">
          <div className="rounded-md relative w-[100px] h-[100px] overflow-hidden">
            <Image src={data.image_src} fill alt="product" />
          </div>
          <div className="flex flex-col gap-1">
            <strong>{data.name}</strong>
            <strong>{price.toLocaleString()}원</strong>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => {
                  setCount((prev) => prev - 1)
                  setPrice(PRODUCT_PRICE.current * (count - 1))
                }}
                className="rounded-lg "
                disabled={count <= 1}
              >
                <FiMinus />
              </Button>
              <span>{count}</span>
              <Button
                size="sm"
                onClick={() => {
                  setCount((prev) => prev + 1)
                  setPrice(PRODUCT_PRICE.current * (count + 1))
                }}
                className="rounded-lg"
              >
                <FiPlus />
              </Button>
            </div>
          </div>
        </div>
        <div>{data.description}</div>
        {data.options &&
          data.options.map((option) => {
            return (
              <div key={option.name}>
                <strong>{option.name}</strong>
                {option.type === 'select' ? (
                  <TabTypeOption
                    option={option}
                    handleOptionChange={handleTabOptionUpdate}
                  />
                ) : (
                  <CheckTypeOption
                    option={option}
                    handleOptionChange={handleCheckOptionUpdate}
                  />
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
              닫기
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              className="flex-1"
              onClick={() => {
                addOrder({
                  price,
                  count,
                  product_id: data.id,
                  product_name: data.name,
                  uid: UID,
                  options: selectedOptions,
                  img_url: data.image_src,
                })
                addAmount(price)
                router.back()
              }}
            >
              선택
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
