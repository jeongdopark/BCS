import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { client } from './utils/supabase'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const {
    data: { session },
  } = await client.auth.getSession()

  // 로그인 된 상태
  if (session) {
    if (req.nextUrl.pathname === '/signin') {
      return NextResponse.redirect(new URL('/store-management', req.url))
    } else {
      return NextResponse.next()
    }
    // 로그인 안 된 상태
  } else {
    if (req.nextUrl.pathname === '/signin') {
      return NextResponse.next()
    }
  }
}
