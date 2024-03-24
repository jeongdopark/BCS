import { client } from '@/utils/supabase'
import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'

const ProductList = async ({ category }: { category: string }) => {
  // let { data: products, error } = await client.from('products').select()
  let { data: products, error } = await client
    .from('products')
    .select(`*, category!inner(english_name)`)
    .eq('category.english_name', category)

  return (
    <div className="flex flex-col w-[90%] gap-3">
      <strong>커피</strong>
      <div className="grid grid-cols-2 gap-10  h-[200px]">
        {products?.map((product: IProduct) => {
          return <ProductCard product={product} key={product.name} />
        })}
      </div>
    </div>
  )
}

export default ProductList
