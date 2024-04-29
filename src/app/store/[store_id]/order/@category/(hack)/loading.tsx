import CategoryFallback from '@/components/fallback/CategoryFallback'

export default function Loading() {
  return (
    <div className="w-[200px] min-h-lvh flex p-3 border-r-[1px] flex-col justify-between">
      <ul className="flex flex-col gap-3 mt-5">
        <strong>카테고리</strong>
        <CategoryFallback />
      </ul>
    </div>
  )
}
