"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "contact_click", location: "header" } }))
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <span className="font-semibold text-foreground text-lg">GrowthOp</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#plans" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Plans
            </Link>
            <Link href="#proof" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Results
            </Link>
            <Link href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Calculator
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/contact"
              onClick={handleContactClick}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="#plans"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Plans
              </Link>
              <Link
                href="#proof"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Results
              </Link>
              <Link
                href="#calculator"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Calculator
              </Link>
              <div className="px-4 pt-2">
                <Link
                  href="/contact"
                  onClick={handleContactClick}
                  className="inline-flex w-full items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-all"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
