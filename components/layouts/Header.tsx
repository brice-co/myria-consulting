'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Approach', href: '/approach' },
  { label: 'Virtual team', href: '/virtual-team' },
  { label: 'Labs', href: '/labs' },
  { label: 'For leaders', href: '/for-leaders' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--navy-200)]/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Myria Consulting home"
        >
          <Image
            src="/images/myria-logo.svg"
            alt="Myria Consulting"
            width={140}
            height={40}
            priority
            className="h-10 w-auto"
          />
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
            href="/about-myria"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About Myria
          </Link>

          <Link
            href="/virtual-advisory-team"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
          >
            Meet the Team
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
