'use server'
import { client } from '@/utils/supabase'

export const createStore = async ({
  name,
  user_id,
}: {
  name: string
  user_id: string
}) => {
  const { data, error } = await client
    .from('store')
    .insert([{ name, user_id }])
    .select()
}

export const updateStore = async ({
  name,
  id,
}: {
  name: string
  id: number
}) => {
  await client.from('store').update({ name }).eq('id', id).select()
}

export const deleteCategory = async (id: number) => {
  const { error } = await client.from('store').delete().eq('id', id)
}
