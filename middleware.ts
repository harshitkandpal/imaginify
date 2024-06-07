import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

const publicRoutes = ['/', '/api/webhooks/clerk', '/api/webhooks/stripe'];

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Use Clerk's middleware for other routes
  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 
