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

  if (error) {
    throw console.error(error)
  } else {
    redirect('/company/1/store')
  }
}

export const signin = async ({ email, password }: IArg) => {
  let { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log('비밀번호가 잘못됨')
    throw console.error(error)
  } else {
    console.log('hello')

    redirect('/company/1/store')
  }
}