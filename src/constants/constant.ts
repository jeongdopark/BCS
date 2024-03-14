import { ColumnDef } from '@tanstack/react-table'

export const PAGINATION = {
  CATEGORY: 5,
  PRODUCT: 4,
}

export const QUERY_KEY = {
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
}

export type Payment = {
  UID: string
  price: number
  time: string
  payment: 'toss' | 'kakao'
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'UID',
    header: 'Order UID',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'payment',
    header: 'Payment',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
]
