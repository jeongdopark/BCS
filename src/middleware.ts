import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    if (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup') {
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
