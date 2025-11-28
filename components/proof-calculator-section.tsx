"use client"

import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"

export function ProofCalculatorSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Proof + Calculator Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ProofMetrics isVisible={isVisible} />
          <RevenueCalculator isVisible={isVisible} />
        </div>

        {/* FAQ Section */}
        <FAQSection isVisible={isVisible} />

        {/* Final CTA */}
        
      </div>
    </section>
  )
}

function ProofMetrics({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      id="proof"
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: "100ms" }}
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Real Results. Real Pipeline.</h3>

      {/* Metrics Grid - 2x2 on mobile, horizontal on larger */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <MetricCard value={187} label="Demos Booked" suffix="" delay={200} isVisible={isVisible} />
        <MetricCard value={41} label="Customers Closed" suffix="" delay={300} isVisible={isVisible} />
        <MetricCard value={2.9} label="Pipeline Created" suffix="M" prefix="$" delay={400} isVisible={isVisible} />
        <MetricCard value={23} label="Demos/Month Avg" suffix="" delay={500} isVisible={isVisible} />
      </div>

      {/* Case highlight */}
      <div className="bg-secondary/50 rounded-xl p-4 border border-border">
        <p className="text-sm text-muted-foreground mb-2">Recent Success</p>
        <p className="text-foreground font-medium">
          SaaS Founder — 23 demos/month in 30 days; sales cycle shortened to 7 weeks.
        </p>
      </div>
    </div>
  )
}

interface MetricCardProps {
  value: number
  label: string
  suffix: string
  prefix?: string
  delay: number
  isVisible: boolean
}

function MetricCard({ value, label, suffix, prefix = "", delay, isVisible }: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div
      className={`bg-card rounded-xl p-4 border border-border transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-2xl sm:text-3xl font-bold text-primary">
        {prefix}
        {suffix === "M" ? displayValue.toFixed(1) : Math.round(displayValue)}
        {suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

function RevenueCalculator({ isVisible }: { isVisible: boolean }) {
  const [leadsPerWeek, setLeadsPerWeek] = useState(20)
  const [conversionRate, setConversionRate] = useState(12)
  const [ticketPrice, setTicketPrice] = useState(1200)

  const mrr = leadsPerWeek * 4 * (conversionRate / 100) * ticketPrice
  const arr = mrr * 12

  const handleCalculatorChange = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("analytics", {
          detail: { event: "calculator_change", leadsPerWeek, conversionRate, ticketPrice },
        }),
      )
    }
  }, [leadsPerWeek, conversionRate, ticketPrice])

  useEffect(() => {
    const debounce = setTimeout(handleCalculatorChange, 500)
    return () => clearTimeout(debounce)
  }, [handleCalculatorChange])

  return (
    <div
      id="calculator"
      className={`bg-card rounded-2xl p-6 border border-border transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: "200ms" }}
    >
      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Calculate Your Revenue Potential</h3>
      <p className="text-sm text-muted-foreground mb-6">See what you're leaving on the table.</p>

      <div className="space-y-6">
        {/* Leads per week slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="leads" className="text-sm font-medium text-foreground">
              Qualified Leads per Week
            </label>
            <span className="text-sm font-semibold text-primary">{leadsPerWeek}</span>
          </div>
          <input
            type="range"
            id="leads"
            min="5"
            max="100"
            value={leadsPerWeek}
            onChange={(e) => setLeadsPerWeek(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            aria-label="Qualified leads per week"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5</span>
            <span>100</span>
          </div>
        </div>

        {/* Conversion rate slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="conversion" className="text-sm font-medium text-foreground">
              Close Rate
            </label>
            <span className="text-sm font-semibold text-primary">{conversionRate}%</span>
          </div>
          <input
            type="range"
            id="conversion"
            min="5"
            max="40"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            aria-label="Close rate percentage"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>5%</span>
            <span>40%</span>
          </div>
        </div>

        {/* Ticket price slider */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="ticket" className="text-sm font-medium text-foreground">
              Average Ticket Price (Monthly)
            </label>
            <span className="text-sm font-semibold text-primary">${ticketPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            id="ticket"
            min="500"
            max="50000"
            step="500"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            aria-label="Average ticket price"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$500</span>
            <span>$50,000</span>
          </div>
        </div>

        {/* Results */}
        <div className="bg-secondary/50 rounded-xl p-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Projected MRR</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                ${mrr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Projected ARR</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                $
                {arr >= 1000000
                  ? `${(arr / 1000000).toFixed(1)}M`
                  : arr.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Estimates are conservative. For exact projections, contact us.
        </p>
      </div>
    </div>
  )
}

const faqs = [
  {
    question: "How fast will I see results?",
    answer:
      "Outbound: 14-30 days to first qualified conversations. Inbound: 60-90 days to consistent inbound demos. Hybrid compounds both timelines for maximum velocity.",
  },
  {
    question: "Do I need to create content or be visible?",
    answer:
      "Not for Outbound — Genesis sources and warms leads for you. For Inbound & Hybrid, founder content accelerates results, but we guide the process.",
  },
  {
    question: "What counts as a qualified lead?",
    answer:
      "ICP-fit decision-maker who meets your target company size and shows intent signals. We score and qualify before your team talks to them.",
  },
]

function FAQSection({ isVisible }: { isVisible: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div
      className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: "500ms" }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-foreground pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}
            >
              <p className="px-4 pb-4 text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
