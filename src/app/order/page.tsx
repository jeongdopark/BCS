import RecommendList from '@/components/order/RecommendList'
import ProductList from '@/components/order/ProductList'
import OrderList from '@/components/order/OrderList'
export default async function Order({
  searchParams,
}: {
  searchParams: { category: string }
}) {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-8 items-center w-full p-3  overflow-scroll mt-5 h-lvh">
        <RecommendList />
        <ProductList category={searchParams.category} />
      </div>
      <div className="w-[40%]">
        <OrderList />
      </div>
    </div>
  )
}
