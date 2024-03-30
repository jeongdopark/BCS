import { Dispatch, SetStateAction } from 'react'

const Payment = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<'takeout' | 'basket' | 'payment'>>
}) => {
  return <div>Payment</div>
}

export default Payment
