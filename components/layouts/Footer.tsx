import Image from 'next/image'
import Link from 'next/link'

const footerMenuItems = [
  { label: 'Approach', href: '/#approach' },
  { label: 'Problems Solved', href: '/#problems-solved' },
  { label: 'Labs', href: '/#labs' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Virtual Teams', href: '/#virtual-team' },
  { label: 'For Leaders', href: '/#for-leaders' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand / Legal */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Myria Consulting home"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                <Image
                  src="/images/myria-logo.png"
                  alt=""
                  width={24}
                  height={24}
                  priority
                  className="h-6 w-6 object-contain brightness-0 invert"
                />
              </span>

              <span className="font-serif text-xl tracking-tight">
                Myria Consulting
              </span>
            </Link>


            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Myria Consulting helps organizations and leaders navigate
              complexity, build stronger teams, and create meaningful,
              sustainable change.
            </p>

            <div className="mt-6 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Myria Consulting.</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h2 className="text-sm font-semibold">Myria</h2>

            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer navigation">
              {footerMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social / Legal */}
          <div>
            <h2 className="text-sm font-semibold">Connect</h2>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/myria-consulting//"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
              </a>

              <a
                href="https://www.facebook.com/MyriaConsulting/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Facebook
              </a>

              <a
                href="mailto:info@myriaconsulting.com"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Email
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy
              </Link>

              <Link
                href="/terms-of-service"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-xs leading-5 text-muted-foreground">
            Myria Consulting is committed to protecting your privacy and
            providing thoughtful, responsible consulting services.
          </p>
        </div>
      </div>
    </footer>
  )
}