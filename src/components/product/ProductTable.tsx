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
import { shortenWords } from '@/lib/utils'
import { usePaginatedProducts } from '@/hooks/product/useProductService'
import Image from 'next/image'
import CustomPagination from '../common/Pagination'
import { PAGINATION } from '@/constants/constant'
import { Button } from '../ui/button'
import { useState } from 'react'
import Modal from '../common/Modal'
import ProductForm from './ProductForm'
import { useProductDelete } from '@/hooks/product/useProductService'

const ProductTable = ({
  current_page,
  store_id,
}: {
  current_page: number
  store_id: string
}) => {
  const { data } = usePaginatedProducts({
    start: (current_page - 1) * PAGINATION.PRODUCT,
    end: current_page * PAGINATION.PRODUCT - 1,
    store_id,
  })
  
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedtId, setSelectedId] = useState<string>()
  const deleteProduct = useProductDelete()
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
                    <Modal
                      open={isUpdateModalOpen && selectedtId === product.id}
                      setOpen={setIsUpdateModalOpen}
                      title="수정"
                      trigger={
                        <Button
                          size="lg"
                          onClick={() => setSelectedId(product.id)}
                        >
                          수정
                        </Button>
                      }
                      InnerComponent={
                        <ProductForm
                          product={product}
                          store_id={store_id}
                          name={product.name}
                          product_id={product.id}
                          setIsModalOpen={setIsUpdateModalOpen}
                          mode="update"
                        />
                      }
                    />
                    <Modal
                      open={isDeleteModalOpen && selectedtId === product.id}
                      setOpen={setIsDeleteModalOpen}
                      title="삭제"
                      trigger={
                        <Button
                          size="lg"
                          onClick={() => setSelectedId(product.id)}
                        >
                          삭제
                        </Button>
                      }
                      InnerComponent={
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-red-600">
                              {product.name}
                            </strong>
                            상품을 삭제하시겠습니까 ?
                          </div>
                          <Button
                            className="w-[120px]"
                            onClick={() => deleteProduct.mutate(product.id)}
                          >
                            삭제
                          </Button>
                        </div>
                      }
                    />
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
