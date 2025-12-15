import { auth } from "@/auth";
import { isTokenValid } from "./lib/utils";
import { NextResponse } from "next/server";

//Or like this if you need to do something here.
export default auth((req) => {
  // console.log("middleware", req.auth);

  const pathname = req.nextUrl.pathname;
  const sensitiveRoutes = ["/dashboard"];
  const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const valid = isTokenValid(req?.auth?.accessToken);
  if (!valid && isAccessingSensitiveRoutes) {
    //do nothing
    return NextResponse.redirect(new URL("/auth/signin?logout=true", req.url));
  }
  //  { session: { user: { ... } } }
});

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
