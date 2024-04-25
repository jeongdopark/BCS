import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
  const user = cookies().get(
    `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_COOKIE_KEY}`,
  )
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(req.nextUrl.pathname, !!session, user)
  if (session && user?.value) {
    if (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/store-management', req.url))
    } else {
      return NextResponse.next()
    }

    // 로그인 된 상태
  } else {
    if (
      req.nextUrl.pathname === '/signin' ||
      req.nextUrl.pathname === '/signup'
    ) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
