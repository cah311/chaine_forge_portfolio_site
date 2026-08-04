import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "cfl_quiz_v";

export function proxy(req: NextRequest) {
  const urlV = req.nextUrl.searchParams.get("v");
  const cookieV = req.cookies.get(COOKIE)?.value;

  let variant: "a" | "b" | "c" | null = null;
  if (urlV === "a" || urlV === "b" || urlV === "c") {
    variant = urlV;
  } else if (cookieV === "a" || cookieV === "b" || cookieV === "c") {
    variant = cookieV;
  } else if (req.nextUrl.pathname.startsWith("/time-leak")) {
    variant = (["a", "b", "c"] as const)[Math.floor(Math.random() * 3)]!;
  }

  const requestHeaders = new Headers(req.headers);
  if (variant) {
    requestHeaders.set("x-quiz-variant", variant);
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (variant) {
    res.cookies.set(COOKIE, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 90,
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  matcher: ["/time-leak", "/time-leak/:path*", "/"],
};
