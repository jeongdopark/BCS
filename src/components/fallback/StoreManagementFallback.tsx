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
import { Skeleton } from '../ui/skeleton'

const StoreManagementFallback = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            <Skeleton className="h-[40px] w-full rounded-xl" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Skeleton className="h-[40px] w-full rounded-xl" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">
            <Skeleton className="h-[40px] w-full rounded-xl" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default StoreManagementFallback
