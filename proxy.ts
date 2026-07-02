import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.endsWith('.md')) {
    const url = request.nextUrl.clone()
    url.pathname = `/md${pathname.slice(0, -3)}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|mp4|pdf)$).*)'],
}
