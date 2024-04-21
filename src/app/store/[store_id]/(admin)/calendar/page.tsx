import Calendar from '@/components/calendar/Calendar'

export default function CalendarPage({
  params,
}: {
  params: { store_id: string }
}) {
  return <Calendar store_id={params.store_id} />
}
