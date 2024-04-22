'use client'

import Payment from '@/components/order/funnel/Payment'
import Takeout from '@/components/order/funnel/Takeout'
import Basket from '@/components/order/funnel/Basket'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'

export default function PaymentModal({params}:{params:{store_id:string}}) {
  const [step, setStep] = useState<'takeout' | 'basket' | 'payment'>('takeout')
  return (
    <Dialog open>
      <DialogContent className="h-[70%]">
        {step === 'takeout' && <Takeout setStep={setStep} />}
        {step === 'basket' && <Basket setStep={setStep} />}
        {step === 'payment' && <Payment setStep={setStep} store_id={params.store_id}/>}
      </DialogContent>
    </Dialog>
  )
}
