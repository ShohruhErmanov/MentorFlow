import { motion } from 'framer-motion'

/**
 * Page footer with links and copyright notice.
 * @param {{ className?: string }} props
 */
export default function Footer({ className = '' }) {
  const links = [
    { label: 'Maxfiylik siyosati', href: '#privacy' },
    { label: 'Foydalanish shartlari', href: '#terms' },
  ]

  return (
    <motion.footer
      className={`flex flex-col items-center gap-2 text-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      role="contentinfo"
    >
      {/* Links */}
      <nav aria-label="Footer navigation" className="flex items-center gap-1.5">
        {links.map((link, i) => (
          <span key={link.href} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-body/30 dark:text-slate-600 text-xs select-none" aria-hidden="true">•</span>
            )}
            <a
              href={link.href}
              className="text-xs text-body dark:text-slate-400 hover:text-primary transition-colors duration-150
                         hover:underline underline-offset-2 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-primary/30 rounded"
            >
              {link.label}
            </a>
          </span>
        ))}
      </nav>

      {/* Copyright */}
      <p className="text-xs text-body/60 dark:text-slate-500">
        © 2026 MentorFlow.{' '}
        <span className="whitespace-nowrap">All rights reserved.</span>
      </p>
    </motion.footer>
  )
}
