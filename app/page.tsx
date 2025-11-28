import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlansSection } from "@/components/plans-section"
import { ProofCalculatorSection } from "@/components/proof-calculator-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PlansSection />
      <ProofCalculatorSection />
      <Footer />
    </main>
  )
}
