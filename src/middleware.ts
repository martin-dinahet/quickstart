import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { decryptJWT } from "@/lib/jwt";

export const middleware = async (req: NextRequest) => {
  try {
    const session = req.cookies.get("session")?.value;
    if (!session) return NextResponse.redirect(new URL("/auth/login", req.url));
    await decryptJWT(session);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
};

export const config = {
  matcher: ["/dashboard"],
};
