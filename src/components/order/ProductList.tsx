'use client'

import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'
import { useAllProduct, useFilterByCategory } from '@/hooks/product/useProductService'

const ProductList = ({ category, store_id }: { category: string; store_id: string }) => {
  const { data: filterdProducts } = useFilterByCategory({ category, store_id })
  const { data: allProducts } = useAllProduct(store_id)
  console.log(filterdProducts)
  return (
    <div className="flex flex-col w-[90%] gap-3">
      <strong>{category}</strong>
      <div className="grid grid-cols-2 gap-10 ">
        {category
          ? filterdProducts?.map((product: any) => {
              return <ProductCard product={product} key={product.name} store_id={store_id} />
            })
          : allProducts?.map((product: Pick<IProduct, 'id' | 'name' | 'price' | 'image_src' | 'description' | 'is_sold_out' | 'is_display'>) => {
              return <ProductCard product={product} key={product.name} store_id={store_id} />
            })}
      </div>
    </div>
  )
}

export default ProductList
