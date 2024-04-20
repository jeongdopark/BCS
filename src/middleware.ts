import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const isLogin = cookieStore.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_COOKIE_KEY}`,
  )

  // 로그인 안 된 상태
  if (isLogin === undefined || isLogin.value === '') {
    if (req.nextUrl.pathname === '/signin') {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
    // 로그인 된 상태
  } else {
    if (req.nextUrl.pathname === '/signin') {
      return NextResponse.redirect(new URL('/store-management', req.url))
    } else {
      return NextResponse.next()
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
