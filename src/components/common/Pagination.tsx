import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface IProps {
  current_page: number
  total_page: number
}

const CustomPagination = ({ current_page, total_page }: IProps) => {
  const page = Array(total_page).fill(0)

  return (
    <Pagination className="mb-[100px]">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${current_page - 1}`}
            className={
              current_page <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
          />
        </PaginationItem>
        {page.map((_, idx) => {
          return (
            <PaginationItem key={idx}>
              <PaginationLink
                href={`?page=${idx + 1}`}
                isActive={idx === current_page - 1}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            href={`?page=${current_page + 1}`}
            className={
              current_page >= total_page
                ? 'pointer-events-none opacity-50'
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination
