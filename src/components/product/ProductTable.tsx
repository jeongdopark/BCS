'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { shortenWords } from '@/lib/utils'
import { usePaginatedProducts } from '@/hooks/product/useProductService'
import Image from 'next/image'
import { PAGINATION } from '@/constants/constant'
import { Button } from '../ui/button'
import { useState } from 'react'
import Modal from '../common/Modal'
import ProductForm from './ProductForm'
import { useProductDelete } from '@/hooks/product/useProductService'
import { useUpdateProductDisplay, useUpdateProductSoldOut } from '@/hooks/product/useProductService'
import Pagination from '../common/Pagination'
import Toggle from '../common/Toggle'

const ProductTable = ({ current_page, store_id }: { current_page: number; store_id: string }) => {
  const {
    data: { data, count },
  } = usePaginatedProducts({ start: (current_page - 1) * PAGINATION.PRODUCT, end: current_page * PAGINATION.PRODUCT - 1, store_id })
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedtId, setSelectedId] = useState<string>()
  const deleteProduct = useProductDelete()
  const updateProductSoldOut = useUpdateProductSoldOut()
  const updateProductDisplay = useUpdateProductDisplay()
  const HEADER_ELEMENT = ['이미지', '상품명', '카테고리', '가격', '설명', '품절', '숨기기', '']
  if (data === undefined) return <div>Loading...</div>
  return (
    <div className="flex flex-col gap-3">
      <Table>
        {data!.length === 0 && <TableCaption>No Result</TableCaption>}
        <TableHeader>
          <TableRow>
            {HEADER_ELEMENT.map((header, idx) => (
              <TableHead className="text-center" key={idx}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.map((product) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <div className="flex justify-center w-full">
                    <Image src={product.image_src} width={90} height={90} alt="product_image" />
                  </div>
                </TableCell>
                <TableCell className="text-center">{product.name}</TableCell>
                <TableCell className="text-center">{product.category.name}</TableCell>
                <TableCell className="text-center">{product.price.toLocaleString()}원</TableCell>
                <TableCell className="text-center">{shortenWords(product.description)}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Toggle
                      status={product.is_sold_out}
                      onCheckedHandler={() =>
                        updateProductSoldOut.mutate({
                          product_id: product.id,
                          current_status: product.is_sold_out,
                          page: (current_page - 1) * PAGINATION.PRODUCT,
                        })
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Toggle
                      status={product.is_display}
                      onCheckedHandler={() =>
                        updateProductDisplay.mutate({
                          product_id: product.id,
                          current_status: product.is_display,
                          page: (current_page - 1) * PAGINATION.PRODUCT,
                        })
                      }
                    />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Modal
                      open={isUpdateModalOpen && selectedtId === product.id}
                      setOpen={setIsUpdateModalOpen}
                      title="수정"
                      trigger={
                        <Button size="sm" onClick={() => setSelectedId(product.id)}>
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
                        <Button size="sm" onClick={() => setSelectedId(product.id)}>
                          삭제
                        </Button>
                      }
                      InnerComponent={
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-red-600">{product.name}</strong>
                            상품을 삭제하시겠습니까 ?
                          </div>
                          <Button className="w-[120px]" onClick={() => deleteProduct.mutate(product.id)}>
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
      <Pagination current_page={current_page} total_page={Math.ceil(count! / PAGINATION.PRODUCT)} />
    </div>
  )
}

export default ProductTable
