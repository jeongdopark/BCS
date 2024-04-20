'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IProduct } from '@/types/product'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ProductCard = ({
  product,
  store_id,
}: {
  product: IProduct
  store_id: string
}) => {
  const router = useRouter()
  return (
    <Card className="flex p-3 gap-2 ">
      <div className="rounded-md relative w-[100px] h-[100px] overflow-hidden">
        <Image src={product.image_src} fill alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 ">
        <span className="text-sm">{product.name}</span>
        <Badge className="flex justify-center w-[40px] text-[10px] bg-red-600">
          best
        </Badge>
        <span className="text-sm">{product.price.toLocaleString()}원</span>
        <Button
          size="sm"
          onClick={() =>
            router.push(`/store/${store_id}/order/product/${product.id}`)
          }
        >
          선택
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
