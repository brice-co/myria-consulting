'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navItems = [
  
  { label: 'About Myria', href: '/about-myria' },
  { label: 'Contact Us', href: '/contact-myria' },
]

const footerMenuItems = [
  { label: 'Discovery', href: '/labs/discovery' },
  { label: 'Strategy', href: '/labs/strategy' },
  { label: 'Operations', href: '/labs/operations' },
  { label: 'AI Data', href: '/labs/ai-data' },
  { label: 'People Change', href: '/labs/people-change' }
]

export function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--navy-200)]/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Myria Consulting home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <Image
            src="/images/myria-logo.png"
            alt="Myria Consulting"
            width={140}
            height={40}
            priority
            className="h-6 w-6 object-contain brightness-0 invert"
          />
          </span>

          <span className="font-serif text-xl tracking-tight">
            Myria Consulting
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          
          <Link
            href="/client-portal"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Client Portal
            <ArrowUpRight className="ml-1 inline" size={15} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-border p-2 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-6 py-5 md:hidden">
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border py-3 text-sm"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/about-myria"
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border py-3 text-sm"
            >
              About Myria
            </Link>

            <Link
              href="/virtual-advisory-team"
              onClick={() => setMenuOpen(false)}
              className="mt-5 block rounded-full bg-foreground px-5 py-3 text-center text-sm font-semibold text-background"
            >
              Meet the Team
              <ArrowUpRight className="ml-1 inline" size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

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
            <h2 className="text-sm font-semibold">Labs</h2>

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

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
      <main className="pt-[73px]">
        {children}
      </main>

      <Footer />
    </div>
  )
}
