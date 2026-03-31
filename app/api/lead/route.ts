import { db } from "@/db"
import { leads } from "@/db/schema/leads"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const lead = await db.insert(leads).values({
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    interest: body.interest
  }).returning()

  return NextResponse.json(lead[0])
}