import { TableCell, TableRow, Table, TableHead, TableHeader } from './Table'
import ProductService from '@/hooks/product/ProductService'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { shortenWords } from '@/lib/utils'

const ProductTable = async () => {
  const { data } = await ProductService.getPaginatedProducts(
    1,
    4,
    'cd6ca774-badc-491e-bedc-54e266da6d08',
  )

  const Header = ['이미지', '상품명', '카테고리', '가격', '설명', '']

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Header.map((header_name: string, index: number) => (
            <TableHead key={index}>{header_name}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      {data?.map((product) => {
        return (
          <TableRow key={product.id}>
            <TableCell className="font-medium w-[100px]">
              <div className="flex justify-center w-full">
                <Image
                  src={product.image_src}
                  width={90}
                  height={90}
                  alt="product_image"
                />
              </div>
            </TableCell>
            <TableCell className="text-center">{product.name}</TableCell>
            <TableCell className="text-center">
              {product.category.name}
            </TableCell>
            <TableCell className="text-center">
              {product.price.toLocaleString()}원
            </TableCell>
            <TableCell className="text-center">
              {shortenWords(product.description)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button size="lg">수정</Button>
                <Button size="lg">삭제</Button>
              </div>
            </TableCell>
          </TableRow>
        )
      })}
    </Table>
  )
}

export default ProductTable
