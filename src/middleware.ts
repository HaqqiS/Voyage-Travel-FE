import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTExtended } from "@/types/auth";
import environment from "@/config/environment";

export async function middleware(request: NextRequest) {
    const token: JWTExtended | null = await getToken({
        req: request,
        secret: environment.NEXTAUTH_SECRET,
    });

    const { pathname } = request.nextUrl;

    if (pathname === "/auth/login" || pathname === "/auth/register") {
        if (token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            const url = new URL("/auth/login", request.nextUrl);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (token?.user?.role !== "admin") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (pathname.startsWith("/user")) {
        if (!token) {
            const url = new URL("/auth/login", request.nextUrl);
            url.searchParams.set("callbackUrl", encodeURI(request.url));
            return NextResponse.redirect(url);
        }
        if (pathname === "/user") {
            return NextResponse.redirect(
                new URL("/user/profile", request.url),
            );
        }
    }
}

export const config = {
    matcher: ["/auth/:path*", "/dashboard/:path*", "/user/:path*"],
};
