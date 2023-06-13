import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Server } from "./utils/config";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer") || request.headers.get("origin");
  let json_response = { status: "error", message: "Invalid request" };
  console.log("Request from: ", referer);
  if (!referer || !referer.startsWith(Server.allowedOrigin ?? "")) {
    return NextResponse.json(json_response);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:function*",
};
