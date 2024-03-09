import { createClient } from '@/supabase/client'

export default async function Notes() {
  const supabase = createClient()
  const { data: notes } = await supabase.from('notes').select()
  console.log(notes)

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
