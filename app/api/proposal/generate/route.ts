import { db } from "@/db"
import { proposals } from "@/db/schema/proposals"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const proposal = await db
    .insert(proposals)
    .values({
      businessName: body.business_name,
      clientName: body.client_name,
      projectGoals: body.project_goals,
      deliverables: body.deliverables,
      budget: body.budget,
      timeline: body.timeline
    })
    .returning()

  return NextResponse.json(proposal[0])
}