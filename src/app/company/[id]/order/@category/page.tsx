import { Button } from '@/components/ui/button'
import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'

export default async function Category() {
  let { data: categories, error } = await client.from('categories').select('*')

  return (
    <aside className="w-[200px] min-h-lvh flex justify-center p-3 border-r-[1px]">
      <ul className="flex flex-col gap-3 mt-5">
        <strong>카테고리</strong>
        {categories?.map((category: ICategory) => {
          return <Button key={category.id}>{category.name}</Button>
        })}
      </ul>
    </aside>
  )
}
