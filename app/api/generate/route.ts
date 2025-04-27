import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { contentType, aiModel } = body

    // Try to connect to the backend
    let backendResponse
    try {
      // Attempt to connect to the Flask backend
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        // Increased timeout to 60 seconds since AI generation can take time
        signal: AbortSignal.timeout(60000),
      })

      if (!response.ok) {
        throw new Error(`Backend returned status: ${response.status}`)
      }

      backendResponse = await response.json()
    } catch (error) {
      console.error("Backend connection error:", error)
      return NextResponse.json({
        success: false,
        error: "Failed to connect to the AI service. Please make sure the backend server is running.",
        fromBackend: false,
        model: aiModel,
      }, { status: 503 })
    }

    // If we got a successful response from the backend
    if (backendResponse && backendResponse.success) {
      return NextResponse.json({
        success: true,
        content: backendResponse.content,
        fromBackend: true,
        model: aiModel,
      })
    } else {
      throw new Error(backendResponse?.error || "Unknown backend error")
    }
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}

