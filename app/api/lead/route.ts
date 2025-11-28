import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX = 5 // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()

    // Server-side validation
    const { company, email, description, offer_expires } = body

    if (!company || typeof company !== "string" || company.trim().length === 0) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 })
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Description validation
    if (description && (typeof description !== "string" || description.length > 250)) {
      return NextResponse.json({ error: "Description must be 250 characters or less" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Store the lead in a database
    // 2. Send a notification email
    // 3. Add to CRM
    // For demo purposes, we'll just log and return success

    console.log("New lead submission:", {
      company: company.trim(),
      email: email.trim(),
      description: description?.trim() || "",
      offer_expires,
      submitted_at: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, message: "Lead submitted successfully" }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
