'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IProductCreate } from '@/types/product'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const ProductCard = ({ product, store_id }: { product: IProductCreate; store_id: string }) => {
  const router = useRouter()
  return (
    <Card className="flex p-3 gap-2 ">
      <div className="rounded-md relative w-[100px] h-[100px] overflow-hidden">
        <Image src={product.image_src} fill alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <span className="text-sm">{product.name}</span>
        {product.is_sold_out && <Badge className="text-[10px] bg-red-600 max-w-max">sold out</Badge>}

        <span className="text-sm">{product.price.toLocaleString()}원</span>
        <Button size="sm" onClick={() => router.push(`/store/${store_id}/order/product/${product.id}`)} disabled={product.is_sold_out}>
          선택
        </Button>
      </div>
    </Card>
  )
}

export default ProductCard
