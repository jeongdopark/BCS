import { Button } from '@/components/ui/button'
import { ICategory } from '@/types/category'
import { client } from '@/utils/supabase'

export default async function Category() {
  let { data: categories, error } = await client.from('categories').select('*')

  return (
    <aside className="w-[200px] min-h-lvh bg-gray-500 flex justify-center p-3">
      <ul className="flex flex-col gap-3 mt-5">
        <Button>전체</Button>
        {categories?.map((category: ICategory) => {
          return <Button key={category.id}>{category.name}</Button>
        })}
      </ul>
    </aside>
  )
}
