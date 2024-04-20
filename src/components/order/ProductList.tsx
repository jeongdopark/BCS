'use client'

import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'
import {
  useAllProduct,
  useFilterByCategory,
} from '@/hooks/product/useProductService'
import { useState } from 'react'

const ProductList = ({
  category,
  store_id,
}: {
  category: string
  store_id: string
}) => {
  console.log(category)
  const { data: filterdProducts } = useFilterByCategory({ category, store_id })
  const { data: allProducts } = useAllProduct(store_id)
  console.log(allProducts)
  return (
    <div className="flex flex-col w-[90%] gap-3">
      <strong>{category}</strong>
      <div className="grid grid-cols-2 gap-10 ">
        {category
          ? filterdProducts?.map((product: IProduct) => {
              return (
                <ProductCard
                  product={product}
                  key={product.name}
                  store_id={store_id}
                />
              )
            })
          : allProducts?.map((product: IProduct) => {
              return (
                <ProductCard
                  product={product}
                  key={product.name}
                  store_id={store_id}
                />
              )
            })}
      </div>
    </div>
  )
}

export default ProductList
