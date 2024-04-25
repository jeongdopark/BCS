'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '../ui/button'
import { IoSettingsSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { useStore } from '@/hooks/store/useStoreService'
import StoreManagementFallback from '../fallback/StoreManagementFallback'

const StoreTable = () => {
  const router = useRouter()
  const { data: stores } = useStore()

  if (!stores) return <StoreManagementFallback />
  return (
    <Table>
      {stores.length === 0 && (
        <TableCaption>등록된 매장이 없습니다.</TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>매장명</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map((store) => {
          return (
            <TableRow key={store.store_id}>
              <TableCell className="font-medium">{store.name}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="lg"
                    onClick={() => {
                      router.push(`/store/${store.store_id}/order`)
                    }}
                  >
                    주문 페이지
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => {
                      router.push(`/store/${store.store_id}/product?page=1`)
                    }}
                  >
                    관리자 페이지
                  </Button>
                  <Button size="lg">
                    <IoSettingsSharp />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default StoreTable
