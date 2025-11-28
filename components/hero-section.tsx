"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleContactClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "contact_click", location: "hero" } }))
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative element */}
        <div
          className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full border border-border">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-muted-foreground">SaaS Founders</span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="text-balance">Stop Chasing.</span>
          <br />
          <span className="text-primary text-balance">Start Closing.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-base sm:text-lg text-muted-foreground max-w-1xl mx-auto mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms" }}
        >
          Scale to $1M+ in 60days.
        </p>

        {/* Micro-proof */}
        <div
          className={`flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">187</span> demos
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">41</span> customers
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">$2.9M</span> pipeline
          </div>
          <span className="w-full sm:w-auto text-xs text-muted-foreground/70">Last 90 days</span>
        </div>

        {/* CTA */}
        <div
          className={`flex flex-col items-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "500ms" }}
        >
          <Link
            href="/contact"
            onClick={handleContactClick}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 animate-subtle-bounce shadow-lg shadow-primary/30"
          >
            Contact
          </Link>
          <p className="text-xs text-muted-foreground">
            Let's see how we can help your sales team grow.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <div className="w-6 h-7 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center p-2">
              <div className="w-10.5 h-3 bg-muted-foreground/30 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
