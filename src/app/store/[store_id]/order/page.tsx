import OrderList from '@/components/order/OrderList'

export default async function Order({ searchParams, params }: { searchParams: { category: string }; params: { store_id: string } }) {
  return <OrderList store_id={params.store_id} />
}
