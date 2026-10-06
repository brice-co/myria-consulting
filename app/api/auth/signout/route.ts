// @/app/api/auth/signout/route.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 1. Terminate the active session via Better Auth API context
    await auth.api.signOut({
      headers: await headers(),
    });

    // 2. Redirect the client back to the login page safely
    return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"));
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign out session securely." }, { status: 500 });
  }
}
