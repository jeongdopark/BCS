'use server'
import { client } from '@/utils/supabase'

export const createCategory = async (name: string) => {
  await client.from('category').insert([{ name }]).select()
}

export const updateCategory = async ({
  name,
  id,
}: {
  name: string
  id: number
}) => {
  await client.from('category').update({ name }).eq('id', id).select()
}

export const deleteCategory = async (id: number) => {
  const { error } = await client.from('category').delete().eq('id', id)
}
