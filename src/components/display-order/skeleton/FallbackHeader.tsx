'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import { ORDER_STATUS } from '@/constants/constants'

const FallbackHeader = () => {
  const TAB_TRIGGER_ELEMS = [
    {
      value: 'receive',
      router: ORDER_STATUS.RECEIVE,
      title: '접수',
    },
    {
      value: 'complete',
      router: ORDER_STATUS.COMPLETE,
      title: '완료',
    },
    {
      value: 'cancel',
      router: ORDER_STATUS.CANCEL,
      title: '취소',
    },
  ]

  return (
    <div className="w-full h-[100px] flex justify-between items-center bg-gray-200 p-7">
      <Button className=" bg-gray-200 hover:bg-gray-200">
        <FaAngleLeft className="text-black size-7" />
      </Button>
      <Tabs className="w-[50%] flex justify-center" defaultValue="receive">
        <TabsList className="w-full">
          {TAB_TRIGGER_ELEMS.map((tab) => {
            return (
              <TabsTrigger key={tab.title} value={tab.value} className="w-full">
                {tab.title} 0
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>
      <Button>초기화</Button>
    </div>
  )
}

export default FallbackHeader
