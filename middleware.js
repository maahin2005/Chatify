import { checkAuth } from "./utils/auth";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl.pathname;
  const isAuth = await checkAuth(request);
  if (!isAuth && url === "/chats") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuth && (url === "/login" || url === "/signup")) {
    return NextResponse.redirect(new URL("/chats", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/chats/:path*", "/login/:path*", "/signup/:path*"],
};
