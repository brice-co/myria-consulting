import { db } from "@/db"
import { invoices } from "@/db/schema/invoices"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const total = body.items.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  )

  const invoice = await db
    .insert(invoices)
    .values({
      clientName: body.client_name,
      clientEmail: body.client_email,
      items: body.items,
      notes: body.notes,
      total
    })
    .returning()

  return NextResponse.json({
    invoiceId: invoice[0].id,
    total
  })
}