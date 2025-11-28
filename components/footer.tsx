import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          
          <p className="text-muted-foreground text-center">Stop chasing. Start closing.</p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Contact
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            Offer valid until <span className="font-medium">Dec 20</span>
          </p>

          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} GrowthOp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
