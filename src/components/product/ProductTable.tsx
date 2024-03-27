'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { usePaginatedProducts } from '@/hooks/query/usePaginatedProducts'
import Image from 'next/image'
import CustomPagination from '../common/Pagination'
import { PAGINATION } from '@/constants/constant'
import { Button } from '../ui/button'

const ProductTable = ({ current_page }: { current_page: number }) => {
  const { data } = usePaginatedProducts(
    (current_page - 1) * 5,
    current_page * 5 - 1,
  )

  return (
    <>
      <Table>
        {data.data!.length === 0 && <TableCaption>No Result</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">이미지</TableHead>
            <TableHead className="text-center">상품명</TableHead>
            <TableHead className="text-center">카테고리</TableHead>
            <TableHead className="text-center">가격</TableHead>
            <TableHead className="text-center">설명</TableHead>

            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data!.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <Image
                    src={product.image_src}
                    width={200}
                    height={200}
                    alt="product_image"
                  />
                </TableCell>
                <TableCell className="text-center">{product.name}</TableCell>

                <TableCell className="text-center">
                  {product.category.name}
                </TableCell>
                <TableCell className="text-center">{product.price}</TableCell>
                <TableCell className="text-center">
                  {product.description}
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
        </TableBody>
      </Table>
      <CustomPagination
        current_page={current_page}
        total_page={Math.ceil(data.count! / PAGINATION.PRODUCT)}
      />
    </>
  )
}

export default ProductTable
