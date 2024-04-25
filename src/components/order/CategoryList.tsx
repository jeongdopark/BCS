'use client'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/category/useCategoryService'
import { ICategory } from '@/types/category'
import { useRouter } from 'next/navigation'

const CategoryList = ({ store_id }: { store_id: string }) => {
  const { data: categories } = useCategories(store_id)
  const router = useRouter()

  return (
    <div className="w-[200px] min-h-lvh flex p-3 border-r-[1px] flex-col justify-between">
      <ul className="flex flex-col gap-3 mt-5">
        <strong>카테고리</strong>
        {categories?.map((category: ICategory) => {
          return (
            <Button
              key={category.id}
              size="lg"
              onClick={() => router.push(`?category=${category.english_name}`)}
            >
              {category.name}
            </Button>
          )
        })}
      </ul>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => router.push(`/store/${store_id}/calendar`)}
      >
        관리자 페이지
      </Button>
    </div>
  )
}

export default CategoryList
