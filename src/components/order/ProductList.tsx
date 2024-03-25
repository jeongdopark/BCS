import { client } from '@/utils/supabase'
import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'

const ProductList = async ({ category }: { category: string }) => {
  let { data: products, error } = await client
    .from('products')
    .select(`*, category!inner(english_name)`)
    .eq('category.english_name', category)

  return (
    <div className="flex flex-col w-[90%] gap-3">
      <strong>{category}</strong>
      <div className="grid grid-cols-2 gap-10 ">
        {products?.map((product: IProduct) => {
          return <ProductCard product={product} key={product.name} />
        })}
      </div>
    </div>
  )
}

export default ProductList
