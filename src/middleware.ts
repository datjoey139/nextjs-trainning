import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api')) {
        return await api(request);
    }

    return await web(request);
}


export async function web(req: NextRequest) {
    return NextResponse.next();
}

export async function api(req: NextRequest) {
    const response = NextResponse.next();
    return response;
}

