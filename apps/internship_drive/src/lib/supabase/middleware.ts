import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Public routes that don't need auth
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/register/student",
    "/register/company",
    "/verify-email",
    "/api/health",
    "/api/turnstile",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/api/health")
  );

  // If not authenticated and trying to access protected route
  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // If authenticated, check role-based access
  if (user) {
    // Fetch user role from the database
    const { data: userData } = await supabase
      .from("users")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    if (userData && !userData.is_active) {
      // Deactivated user — sign out and redirect
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "account_deactivated");
      return NextResponse.redirect(url);
    }

    if (userData) {
      const role = userData.role;

      // Redirect authenticated users from auth pages to their dashboard
      if (pathname === "/login" || pathname === "/register" || pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = `/${role}`;
        return NextResponse.redirect(url);
      }

      // Block access to other roles' routes
      const roleRoutes: Record<string, string> = {
        student: "/student",
        company: "/company",
        admin: "/admin",
      };

      for (const [r, prefix] of Object.entries(roleRoutes)) {
        if (pathname.startsWith(prefix) && r !== role) {
          const url = request.nextUrl.clone();
          url.pathname = `/${role}`;
          return NextResponse.redirect(url);
        }
      }
    }
  }

  return supabaseResponse;
}
