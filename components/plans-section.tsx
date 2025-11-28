"use client"

import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Inbound Authority",
    tagline: "Build branding authority that attracts qualified buyers.",
    timeToResults: "60-90 days",
    features: [
      "Founder-led content positioning that builds trust",
      "Educational funnels that warm buyers before outreach",
      "SEO & content distribution for consistent organic demos",
      "Lead scoring & qualification aligned to sales",
      "Shorter close cycles through content-driven nurture",
    ],
    recommended: false,
  },
  {
    name: "Outbound Precision",
    tagline: "Fast, precise pipeline — no founder grind.",
    timeToResults: "14-30 days",
    features: [
      "ICP-matched lead sourcing and enrichment",
      "AI-powered lead scoring",
      "Multi-sequence outreach: cold email + warm intros",
      "Managed reply inbox + nurture sequences",
      "Continuous optimization & metrics tracking",
    ],
    recommended: false,
  },
  {
    name: "Hybrid",
    tagline: "Authority + precision together for aggressive growth.",
    timeToResults: "30 days outbound; 60-90 days full",
    features: [
      "Everything in Inbound + Outbound combined",
      "Founder content warms audiences for higher conversion",
      "Multi-layered scoring & closed-loop attribution",
      "SDR-style reply handling & warm intros to sales",
      "Personalized onboarding & account strategy sprints",
      "Custom integrations (CRM, product analytics, trial flows)",
      "Growth playbooks for scale and expansion revenue",
      "Dedicated optimization & weekly performance reviews",
    ],
    recommended: true,
  },
]

export function PlansSection() {
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

  const handlePlanClick = (planName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("analytics", { detail: { event: "plan_select", plan: planName } }))
    }
  }

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Pick the plan that's right for you</h2>
          <p className="text-muted-foreground">Choose your growth engine based on your timeline and goals.</p>
        </div>

        {/* Desktop: Horizontal cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} isVisible={isVisible} onPlanClick={handlePlanClick} />
          ))}
        </div>

        {/* Mobile/Tablet: Horizontal scroll carousel */}
        <div className="lg:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {plans.map((plan, index) => (
              <div key={plan.name} className="w-[85vw] max-w-sm snap-center flex-shrink-0">
                <PlanCard plan={plan} index={index} isVisible={isVisible} onPlanClick={handlePlanClick} />
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 lg:hidden">Swipe to explore plans</p>
      </div>
    </section>
  )
}

interface PlanCardProps {
  plan: (typeof plans)[0]
  index: number
  isVisible: boolean
  onPlanClick: (planName: string) => void
}

function PlanCard({ plan, index, isVisible, onPlanClick }: PlanCardProps) {
  return (
    <div
      className={`relative bg-card rounded-2xl p-6 border transition-all duration-700 h-full flex flex-col ${
        plan.recommended
          ? "border-primary shadow-lg shadow-primary/20 animate-pulse-glow"
          : "border-border hover:border-primary/50"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            <Sparkles className="w-3 h-3" />
            Recommended
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.tagline}</p>
      </div>

      <div className="flex-1">
        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border mt-auto">
        <p className="text-xs text-muted-foreground mb-4">
          Time to results: <span className="font-medium text-foreground">{plan.timeToResults}</span>
        </p>
        <Link
          href="/contact"
          onClick={() => onPlanClick(plan.name)}
          className={`inline-flex w-full items-center justify-center px-6 py-3 font-medium text-sm rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] ${
            plan.recommended
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
          }`}
        >
          Contact to start
        </Link>
      </div>
    </div>
  )
}
