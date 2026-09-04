import Link from 'next/link'
import { ArrowUpRight, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Approach', href: '#approach' },
  { label: 'Virtual Team', href: '/#virtual-team' },
  { label: 'Labs', href: '/#labs' },
  { label: 'For Leaders', href: '/#for-leaders' },
  { label: 'Ask Myria', href: '/about-myria' },
  { label: "Let's Talk", href: '/contact-myria' },
]

export function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const router = useRouter()
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

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
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
        <div className="hidden items-center gap-4 md:flex">
          
          <Link href="/client-portal" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5">Client Portal <ArrowUpRight className="ml-1 inline" size={15} /></Link>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-border p-2 md:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {menuOpen && <div className="border-t border-border bg-background px-6 py-5 md:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm">{item.label}</Link>)}</div>}
    </header>
  )
}
