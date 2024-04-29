import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbDots } from 'react-icons/tb'
import { Button } from '../ui/button'
import { PaginationContent, PaginationItem, PaginationLink } from '../ui/pagination'
import Link from 'next/link'

const Pagination = ({ total_page, current_page }: { total_page: number; current_page: number }) => {
  const PAGE_PER_COUNT = 5
  const start_page = Math.floor((current_page - 1) / PAGE_PER_COUNT) * PAGE_PER_COUNT + 1
  const page = Array(total_page)
    .fill(0)
    .slice(start_page - 1, start_page - 1 + PAGE_PER_COUNT)

  return (
    <div className="flex justify-center">
      <PaginationContent>
        <Button size="sm" className={current_page <= 1 ? 'pointer-events-none opacity-50' : undefined}>
          <Link href={`?page=1`}>
            <MdKeyboardDoubleArrowLeft size="20" />
          </Link>
        </Button>
        <Button size="sm" className={current_page <= 1 ? 'pointer-events-none opacity-50' : undefined}>
          <Link href={`?page=${current_page - 1}`}>
            <MdKeyboardArrowLeft size="20" />
          </Link>
        </Button>
        {start_page !== 1 && (
          <PaginationItem>
            <Button size="sm" variant="ghost">
              <TbDots />
            </Button>
          </PaginationItem>
        )}

        {page.map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink href={`?page=${idx + start_page}`} isActive={current_page === start_page + idx}>
              {start_page + idx}
            </PaginationLink>
          </PaginationItem>
        ))}
        {start_page + PAGE_PER_COUNT - 1 < total_page && (
          <PaginationItem>
            <Button size="sm" variant="ghost">
              <TbDots />
            </Button>
          </PaginationItem>
        )}
        <Button size="sm" className={current_page >= total_page ? 'pointer-events-none opacity-50' : undefined}>
          <Link href={`?page=${current_page + 1}`}>
            <MdKeyboardArrowRight size="20" />
          </Link>
        </Button>
        <Button size="sm" className={current_page >= total_page ? 'pointer-events-none opacity-50' : undefined}>
          <Link href={`?page=${total_page}`}>
            <MdKeyboardDoubleArrowRight size="20" />
          </Link>
        </Button>
      </PaginationContent>
    </div>
  )
}

export default Pagination
