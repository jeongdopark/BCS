import { cn } from '@/lib/utils'
import React from 'react'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className, '[&_tr]:border-b')} {...props} />
))

TableHeader.displayName = 'TableHeader'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        className,
        'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] text-sm',
      )}
      {...props}
    />
  )
})

TableCell.displayName = 'TableCell'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      className,
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    )}
    {...props}
  />
))

TableRow.displayName = 'TableRow'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
))

TableBody.displayName = 'TableBody'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(className, 'text-gray-500 font-normal text-sm mb-1')}
    {...props}
  />
))

TableHead.displayName = 'TableHead'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full h-full overflow-auto">
    <table ref={ref} className={cn(className, 'w-full')} {...props} />
  </div>
))

Table.displayName = 'Table'

export { TableHeader, TableCell, TableRow, TableBody, TableHead, Table }