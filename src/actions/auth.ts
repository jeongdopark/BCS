'use server'

import { client } from '@/utils/supabase'
import { redirect } from 'next/navigation'

interface IArg {
  email: string
  password: string
}

export const signInWithKakao = async () => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: 'kakao',
  })
  console.log(data)

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
  let { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })
  console.log(data)

  return { data, error: error?.message }
}
