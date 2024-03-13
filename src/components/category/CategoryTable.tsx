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
import { Button } from '../ui/button'
import useCategoriesQuery from '@/hooks/query/useCategoriesQuery'
import { useState } from 'react'
import Modal from '../common/Modal'
import CategoryForm from './CategoryForm'
import useCategoryDelete from '@/hooks/mutation/useCategoryDelete'

const CategoryTable = () => {
  const { data: categories, isFetched, isLoading } = useCategoriesQuery()
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedtId, setSelectedId] = useState<number>()
  const deleteCategory = useCategoryDelete()

  if (!isFetched || isLoading || !categories) return <div>Loading...</div>
  return (
    <Table>
      {categories.length === 0 && <TableCaption>No Result</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">카테고리명</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => {
          return (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Modal
                    open={isUpdateModalOpen && selectedtId === category.id}
                    setOpen={setIsUpdateModalOpen}
                    title="수정"
                    trigger={
                      <Button
                        size="lg"
                        onClick={() => setSelectedId(category.id)}
                      >
                        수정
                      </Button>
                    }
                    InnerComponent={
                      <CategoryForm
                        name={category.name}
                        id={category.id}
                        setIsModalOpen={setIsUpdateModalOpen}
                        mode="update"
                      />
                    }
                  />
                  <Modal
                    open={isDeleteModalOpen && selectedtId === category.id}
                    setOpen={setIsDeleteModalOpen}
                    title="삭제"
                    trigger={
                      <Button
                        size="lg"
                        onClick={() => setSelectedId(category.id)}
                      >
                        삭제
                      </Button>
                    }
                    InnerComponent={
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-red-600">
                            {category.name}
                          </strong>
                          카테고리 삭제하시겠습니까 ?
                        </div>
                        <Button
                          className="w-[120px]"
                          onClick={() => deleteCategory.mutate(category.id)}
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
  )
}

export default CategoryTable
