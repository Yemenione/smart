import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple password for the admin panel
// For production, this should be in an environment variable e.g. process.env.ADMIN_PASSWORD
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'deuleux2025'

export function middleware(request: NextRequest) {
    // Only protect the /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const authCookie = request.cookies.get('admin_auth')
        const isLoginPage = request.nextUrl.pathname === '/admin/login'

        // If not authenticated and not on login page, redirect to login
        if (authCookie?.value !== 'authenticated' && !isLoginPage) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // If already authenticated and trying to access login, redirect to dashboard
        if (authCookie?.value === 'authenticated' && isLoginPage) {
            return NextResponse.redirect(new URL('/admin', request.url))
        }
    }

    // Add protection for API routes
    if (request.nextUrl.pathname.startsWith('/api/settings') && request.method === 'POST') {
        const authCookie = request.cookies.get('admin_auth')
        if (authCookie?.value !== 'authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }

    if (request.nextUrl.pathname.startsWith('/api/posts') && ['POST', 'PUT', 'DELETE'].includes(request.method)) {
        const authCookie = request.cookies.get('admin_auth')
        if (authCookie?.value !== 'authenticated') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/api/settings', '/api/posts', '/api/posts/:path*'],
}
