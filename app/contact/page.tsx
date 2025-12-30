"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    company: "",
    email: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  console.log("🔵 SUBMIT CLICKED")
  console.log("Form data:", formData)

  // Validation
  if (!formData.company.trim()) {
    setError("Company name is required")
    console.log("❌ Validation failed: no company")
    return
  }
  if (!formData.email.trim()) {
    setError("Email is required")
    console.log("❌ Validation failed: no email")
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    setError("Please enter a valid email address")
    console.log("❌ Validation failed: invalid email format")
    return
  }
  if (formData.description.length > 250) {
    setError("Description must be 250 characters or less")
    console.log("❌ Validation failed: description too long")
    return
  }

  setIsSubmitting(true)
  console.log("⏳ Sending POST request...")

  try {
    const payload = {
      company: formData.company,
      email: formData.email,
      description: formData.description,
      offer_expires: "2025-12-20",
    }

    console.log("🔵 Payload sending to backend:", payload)

    const response = await fetch("https://dimeji-agency.onrender.com/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("🔵 Raw response:", response)

    const responseText = await response.text()
    console.log("🔵 Response body text:", responseText)

    if (!response.ok) {
      console.log("❌ Backend returned non-OK status:", response.status)
      throw new Error("Failed to submit")
    }

    // Fire analytics event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("analytics", { detail: { event: "form_submit", company: formData.company } }),
      )
      console.log("📈 Analytics event fired")
    }

    console.log("✅ Success — setting isSubmitted")
    setIsSubmitted(true)

  } catch (err: any) {
    console.log("🔥 ERROR in submit handler:", err)
    setError("Something went wrong. Please try again.")

  } finally {
    console.log("⏹️ FINALLY block executed — stopping loader")
    setIsSubmitting(false)
  }
}

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Thanks for reaching out!</h1>
            <p className="text-muted-foreground">We'll contact you within 24 hours to schedule a strategy call.</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="font-semibold text-foreground text-lg">ASD</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Let's Talk Growth</h1>
          <p className="text-muted-foreground">Tell us about your SaaS and we'll reach out within 24 hours.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
              Company / SaaS Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="Acme SaaS"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Contact Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="founder@company.com"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Short Description <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              maxLength={250}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-foreground placeholder:text-muted-foreground"
              placeholder="Tell us about your product and ideal customer..."
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">{formData.description.length}/250</p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            ASD </p>
        </form>
      </div>
    </main>
  )
}
