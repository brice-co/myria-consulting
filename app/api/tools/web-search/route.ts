import { NextResponse } from "next/server"

export async function POST(req: Request) {

  const { query } = await req.json()

  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      max_results: 5,
    }),
  })

  const data = await res.json()

  return NextResponse.json({
    summary: data.results?.map((r:any)=>r.content).join("\n\n")
  })
}