'use server'
import { cookies } from 'next/headers'

export const getUserId = async () => {
  return cookies().get('user_id')
}
