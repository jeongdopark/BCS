import RecommendList from '@/components/order/RecommendList'
import ProductList from '@/components/order/ProductList'
import OrderList from '@/components/order/OrderList'
export default async function Order({
  searchParams,
}: {
  searchParams: { page: string; category: string }
}) {
  console.log(searchParams.category)

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-8 items-center w-full p-3  overflow-scroll mt-5 h-lvh">
        <RecommendList />
        <ProductList
          category={searchParams.category}
          page={Number(searchParams.page)}
        />
      </div>
      <div className="w-[40%]">
        <OrderList />
      </div>
    </div>
  )
}
