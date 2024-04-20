'use server'
import { Button } from '../ui/button'
import { cookies } from 'next/headers'

import { redirect } from 'next/navigation'
const Signout = async () => {
  const signoutHandler = async () => {
    'use server'
    cookies().delete(`${process.env.NEXT_PUBLIC_SUPABASE_AUTH_COOKIE_KEY}`)
    cookies().delete('user_id')
    redirect('/signin')
  }

  return (
    <form action={signoutHandler}>
      <Button size="lg" variant="destructive">
        로그아웃
      </Button>
    </form>
  )
}

export default Signout
