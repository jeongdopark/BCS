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

const StoreTable = () => {
  const router = useRouter()
  return (
    <Table>
      <TableCaption>등록된 매장이 없습니다.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>매장명</TableHead>
          <TableHead>위치</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">투썸 플레이스 간석점</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button size="lg" onClick={() => router.push('/order')}>
                주문 페이지
              </Button>
              <Button size="lg" onClick={() => router.push('/product?page=1')}>
                관리자 페이지
              </Button>
              <Button size="lg">
                <IoSettingsSharp />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default StoreTable
