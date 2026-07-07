import { NextResponse, type NextRequest } from 'next/server'

function localeForPath(pathname: string) {
  if (pathname === '/zh-CN' || pathname.startsWith('/zh-CN/')) return 'zh-CN'
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es'
  return 'en'
}

function withLanguageHeader(response: NextResponse, pathname: string) {
  response.headers.set('Content-Language', localeForPath(pathname))
  return response
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/four-temperament-test' || pathname === '/four-temperament-test.md') {
    const url = request.nextUrl.clone()
    url.pathname = pathname.endsWith('.md') ? '/four-temperaments-test.md' : '/four-temperaments-test'
    return withLanguageHeader(NextResponse.redirect(url, 308), pathname)
  }

  if (pathname.endsWith('.md')) {
    const url = request.nextUrl.clone()
    url.pathname = `/md${pathname.slice(0, -3)}`
    return withLanguageHeader(NextResponse.rewrite(url), pathname)
  }

  return withLanguageHeader(NextResponse.next(), pathname)
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico|mp4|pdf)$).*)'],
}
