import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { IProduct } from '@/types/product'
import Image from 'next/image'
import { Button } from '../ui/button'

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="flex p-3  justify-between gap-2">
      <div className="rounded-md relative w-[100px] h-[100px] overflow-hidden">
        <Image src={product.image_src} fill alt={product.name} />
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <span className="text-sm">{product.name}</span>
        <Badge className="flex justify-center w-[40px] text-[10px] bg-red-600">
          best
        </Badge>
        <span className="text-sm">{product.price}</span>
        <Button size="sm">선택</Button>
      </div>
    </Card>
  )
}

export default ProductCard
