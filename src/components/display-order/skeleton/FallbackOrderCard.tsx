import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const FallbackOrderList = () => {
  const DUMMY_ARRAY = Array(4).fill(0)
  return (
    <div className="w-full p-10 flex gap-3 justify-start items-start">
      {DUMMY_ARRAY.map((_, idx) => {
        return (
          <Card
            className="w-[25%] h-[200px] flex-col justify-between flex"
            key={idx}
          >
            <div>
              <Skeleton className="w-full h-[100px]" />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <Skeleton className="w-full h-[20px]" />
              <Skeleton className="w-full h-[20px]" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default FallbackOrderList
