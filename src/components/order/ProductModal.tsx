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
  const router = useRouter()
  const { data } = useProductQuery(id)
  const PRODUCT_PRICE = useRef(data[0].price)
  const addOrder = useOrderStore((state) => state.addOrder)
  const addAmount = useOrderStore((state) => state.addAmount)
  const UID = Math.random() * 1000
  const [count, setCount] = useState(1)
  const [price, setPrice] = useState(data[0].price)
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
    console.log(selectedOptions, 'select')
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
            <Image src={data[0].image_src} fill alt="product" />
          </div>
          <div className="flex flex-col gap-1">
            <strong>{data[0].name}</strong>
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
        <div>{data[0].description}</div>
        {data[0].options &&
          data[0].options.map((option) => {
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
                addOrder({
                  price,
                  count,
                  product_id: data[0].id,
                  product_name: data[0].name,
                  uid: UID,
                  options: selectedOptions,
                })
                addAmount(price)
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
