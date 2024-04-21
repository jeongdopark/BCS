'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import { ORDER_STATUS } from '@/constants/constant'
import React from 'react'
import { IDisplayOrder } from '@/types/order'
import { useRouter } from 'next/navigation'
import FallbackHeader from './skeleton/FallbackHeader'
import InitModal from './InitModal'

const Header = ({
  orders,
  store_id,
}: {
  orders: IDisplayOrder[]
  store_id: string
}) => {
  const router = useRouter()

  if (!orders) return <FallbackHeader />

  const TAB_TRIGGER_ELEMS = [
    {
      value: 'receive',
      router: ORDER_STATUS.RECEIVE,
      title: '접수',
      count: orders.filter((order) => order.status === 'receive').length,
    },
    {
      value: 'complete',
      router: ORDER_STATUS.COMPLETE,
      title: '완료',
      count: orders.filter((order) => order.status === 'complete').length,
    },
    {
      value: 'cancel',
      router: ORDER_STATUS.CANCEL,
      title: '취소',
      count: orders.filter((order) => order.status === 'cancel').length,
    },
  ]

  return (
    <div className="w-full h-[100px] flex justify-between items-center bg-gray-200 p-7">
      <Button
        className="bg-gray-200 hover:bg-gray-200"
        onClick={() => router.push(`/store/${store_id}/calendar`)}
      >
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs
        defaultValue={ORDER_STATUS.RECEIVE}
        className="w-[50%] flex justify-center"
      >
        <TabsList className="w-full">
          {TAB_TRIGGER_ELEMS.map((tab) => {
            return (
              <TabsTrigger
                key={tab.title}
                value={tab.value}
                className="w-full"
                onClick={() => router.push(`?status=${tab.router}&page=1`)}
              >
                {tab.title} {tab.count}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
      <InitModal store_id={store_id} />
    </div>
  )
}

export default Header
