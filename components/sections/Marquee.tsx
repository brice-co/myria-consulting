'use client'

import { motion } from 'framer-motion'

const techNames = [
  'React 19', 'Next.js 15', 'Tailwind CSS', 'TypeScript', 'PostgreSQL',
  'Drizzle', 'Prisma', 'Clerk', 'Stripe', 'Three.js', 'NextAuth.js', 
  'Framer Motion', 'Vercel',
]

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-background py-8">
      {/* Optional gradient overlay for edges */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-r from-background via-transparent to-background" />

      {/* Animated row */}
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
      >
        {[...techNames, ...techNames].map((tech, index) => (
          <span
            key={index}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-muted-foreground hover:text-purple-500 transition duration-300 hover:scale-110"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
