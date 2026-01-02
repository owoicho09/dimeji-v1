import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ASD | Stop Chasing. Start Closing.",
  description:
    "ASD delivers 15+ qualified leads weekly — we source, score, and close the outreach so you don't have to. Inbound, Outbound, and Hybrid growth engines for SaaS founders.",
  keywords: ["SaaS", "lead generation", "outbound", "inbound", "growth", "pipeline", "MRR", "ARR"],
  openGraph: {
    title: "ASD | Stop Chasing. Start Closing.",
    description:
      "ASD delivers 15+ qualified leads weekly — we source, score, and close the outreach so you don't have to.",
    type: "website",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#00C853",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
