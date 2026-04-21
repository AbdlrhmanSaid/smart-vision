import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // المسارات التي لا تتطلب تسجيل دخول
  const isPublicPath = pathname.startsWith("/login") || pathname.startsWith("/register");

  // إذا كان يملك توكن وحاول الدخول للصفحة الرئيسية أو صفحات تسجيل الدخول، حوله للداشبورد
  if (token && (isPublicPath || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // إذا لم يكن يملك توكن وحاول الوصول للداشبورد أو المجلد الرئيسي، أو أي صفحة أخرى محمية، حوله لصفحة الدخول
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * تطبيق الميدلوير على جميع المسارات عدا:
     * - api (مسارات الـ API)
     * - _next/static (ملفات النظام والتنسيقات الثابتة)
     * - _next/image (تخصيص الصور)
     * - favicon.ico (أيقونة الموقع)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
