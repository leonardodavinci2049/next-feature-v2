import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
console.log("Middleware executado:", request.nextUrl.pathname);

}

export const config = {
  matcher: ["/animais/image/:path*"],
  
};