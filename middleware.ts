import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — this is what keeps the user signed in
  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes — redirect to sign in if not authenticated
  const protectedPaths = ['/dashboard', '/profile', '/bookings', '/wishlist']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath && !user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If signed in and trying to access auth pages, redirect to dashboard
  const authPaths = ['/auth/signin', '/auth/signup']
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPath && user) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
