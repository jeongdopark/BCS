'use client'

import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'
import { useFilterByCategory } from '@/hooks/query/useFilterByCategoryProduct'

const ProductList = ({ category }: { category: string }) => {
  const { data: products } = useFilterByCategory(category)
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
