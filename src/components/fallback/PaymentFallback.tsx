import { Skeleton } from '../ui/skeleton'
import CheckCircleIcon from './CheckIcon'

const PaymentFallback = () => {
  return (
    <div className="flex justify-center items-center w-full h-lvh">
      <div className="grid max-w-3xl gap-4 px-4 mx-auto items-center space-y-4 ">
        <div className="flex flex-col items-center space-y-2 text-center">
          <CheckCircleIcon className="h-10 w-10 text-primary" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">결제 완료</h1>
          </div>
        </div>
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  )
}

export default PaymentFallback
