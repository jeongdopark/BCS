import { client } from '@/utils/supabase'
import ProductList from './ProductList'
import ProductCard from './ProductCard'
import { IProduct } from '@/types/product'
import { Button } from '../ui/button'

const OrderList = async () => {
  let { data: products, error } = await client.from('products').select()
  return (
    <div className="flex flex-col gap-3 h-lvh border-l-[1px] p-3 pt-8">
      <strong>주문 상품</strong>
      <section className="flex flex-col gap-3 h-[70%] overflow-scroll">
        {products?.map((product: IProduct) => {
          return <ProductCard product={product} />
        })}
      </section>
      <div className=" flex flex-col gap-5 p-5 border-t-[1px]">
        <span>주문 금액 : 9,000원</span>
        <Button>주문하기</Button>
      </div>
    </div>
  )
}

export default OrderList
