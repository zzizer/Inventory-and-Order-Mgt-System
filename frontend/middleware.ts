import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token from cookies or authorization header
  const token = request.cookies.get('accessToken')?.value || request.headers.get('authorization');
  
  // List of paths that require authentication
  const protectedPaths = ['/', '/dashboard', '/profile']; // Add your homepage '/' to protect it
  
  // Check if the current path is protected and user is not authenticated
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(`${path}/`)
  );
  
  if (isProtectedPath && !token) {
    // Redirect to login page with the correct path (/auth/login)
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

// Configure matcher for which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /auth/* (auth routes)
     * - /_next/static (static files)
     * - /_next/image (image optimization files)
     * - /favicon.ico, /logo.svg, etc. (favicon files)
     */
    '/((?!auth|_next/static|_next/image|favicon.ico).*)',
  ],
};