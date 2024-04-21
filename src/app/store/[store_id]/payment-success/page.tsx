'use client'

import { TableCell, TableRow, TableBody, Table } from '@/components/ui/table'
import { CardContent, CardFooter, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useOrderStore } from '@/stores/order'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createOrderHistory } from '@/actions/order-history'
import { createOrderDisplay } from '@/actions/display-order'
import PaymentFallback from '@/components/fallback/PaymentFallback'
import CheckCircleIcon from '@/components/fallback/CheckIcon'
import { IOrder } from '@/types/order'

export default function Page({ params }: { params: { store_id: string } }) {
  const router = useRouter()
  const orders = useOrderStore((state: any) => state.orders)
  const total_amount = useOrderStore((state: any) => state.total_amount)
  const takeout = useOrderStore((state: any) => state.isTakeout)
  const init_store = useOrderStore((state: any) => state.initStore)

  useEffect(() => {
    if (orders.length > 0 && total_amount) {
      createOrderHistory({
        store_id: params.store_id,
        orders: orders,
        price: total_amount,
        takeout: takeout,
      })
      createOrderDisplay({
        store_id: params.store_id,
        orders: orders,
        status: 'receive',
        takeout: takeout,
      })

      setTimeout(() => {
        router.push(`/store/${params.store_id}/order`)
        init_store()
      }, 3000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  if (orders.length === 0) return <PaymentFallback />

  return (
    <div className="flex justify-center items-center w-full h-lvh">
      <div className="grid max-w-3xl gap-4 px-4 mx-auto items-center space-y-4 ">
        <div className="flex flex-col items-center space-y-2 text-center">
          <CheckCircleIcon className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">결제 완료</h1>
            <p className="text-gray-500 dark:text-gray-400">
              3초 후 주문 페이지로 이동됩니다.
            </p>
          </div>
        </div>
        <Card className="w-full p-0">
          <CardContent className="p-0">
            <Table>
              <TableBody>
                {orders.map((order: IOrder) => {
                  return (
                    <TableRow key={order.uid}>
                      <TableCell className="flex justify-center p-4">
                        <div className="font-medium">{order.product_name}</div>
                      </TableCell>
                      <TableCell className="w-32 text-center p-4">
                        {order.price.toLocaleString()}원
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              결제 금액
            </div>
            <div className="ml-auto">{total_amount.toLocaleString()}원</div>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full md:w-auto"
            onClick={() => {
              init_store()
              router.push(`/store/${params.store_id}/order`)
            }}
          >
            {' '}
            주문 페이지
          </Button>
        </div>
      </div>
    </div>
  )
}
