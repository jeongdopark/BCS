'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Header from './Header'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/stores/order'

const Takeout = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<'takeout' | 'basket' | 'payment'>>
}) => {
  const router = useRouter()
  const takeoutHandler = useOrderStore((state: any) => state.takeoutHandler)
  const _isTakeout = useOrderStore((state: any) => state.isTakeout)

  return (
    <div className="flex flex-col gap-5 items-center justify-between">
      <Header step="takeout" />
      <div className="flex justify-center gap-3">
        <Card
          className={`p-10 w-[150px] text-center cursor-pointer hover:bg-gray-100 ${_isTakeout === false ? 'bg-gray-100' : 'bg-white'}`}
          onClick={() => {
            takeoutHandler(false)
          }}
        >
          매장
        </Card>
        <Card
          className={`p-10 w-[150px] text-center cursor-pointer hover:bg-gray-100 ${_isTakeout === true ? 'bg-gray-100' : 'bg-white'}`}
          onClick={() => {
            takeoutHandler(true)
          }}
        >
          포장
        </Card>
      </div>
      <div className="flex justify-center gap-3">
        <Button
          size="lg"
          className="w-[100px]"
          onClick={() => {
            router.back()
          }}
        >
          뒤로가기
        </Button>
        <Button
          size="lg"
          className="w-[100px]"
          onClick={() => setStep('basket')}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Takeout
