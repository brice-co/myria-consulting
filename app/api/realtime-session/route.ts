import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }    const { voice = "alloy", instructions } = await req
      .json()
      .catch(() => ({}));


    console.log("Creating OpenAI realtime session with voice:", voice);

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-realtime-mini",
          voice,
          modalities: ["audio", "text"],
          instructions: instructions ,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const session = await response.json();
    console.log("Session created successfully");

    return NextResponse.json({
      token: session.client_secret.value,
    });
  } catch (error: unknown) {
    console.error("Error creating realtime session:", error);

    const message =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
