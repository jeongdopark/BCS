'use server'

import { client } from '@/utils/supabase'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import {
  createClientComponentClient,
  createServerActionClient,
} from '@supabase/auth-helpers-nextjs'
interface IArg {
  email: string
  password: string
}

export const signInWithKakao = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'kakao',
  })

  if (error) {
    throw console.error(error)
  } else {
    redirect(data.url)
  }
}

export const signUpNewUser = async ({ email, password }: IArg) => {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  })

  return { data, error: error?.message }
}

export const signin = async ({ email, password }: IArg) => {
  const supabase = createServerActionClient({ cookies })
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  cookies().set({ name: 'user_id', value: data.user?.id!, httpOnly: true })

  return { data, error: error?.message }
}
