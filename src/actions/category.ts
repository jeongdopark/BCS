'use server'
import { client } from '@/utils/supabase'

export const createCategory = async ({
  name,
  english_name,
  store,
}: {
  name: string
  english_name: string
  store: string
}) => {
  await client.from('categories').insert({ name, english_name, store }).select()
}

export const updateCategory = async ({
  name,
  id,
}: {
  name: string
  id: number
}) => {
  await client.from('categories').update({ name }).eq('id', id).select()
}

export const deleteCategory = async (id: number) => {
  const { error } = await client.from('categories').delete().eq('id', id)
}
