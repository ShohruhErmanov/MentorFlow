import { motion } from 'framer-motion'

import Logo from '../components/Logo.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import LoginCard from '../components/LoginCard.jsx'
import DashboardIllustration from '../components/DashboardIllustration.jsx'
import { useLogin } from '../hooks/useLogin.js'

const FEATURES = [
  {
    icon: '✅',
    title: 'Vazifalarni boshqarish',
    description: 'Barcha topshiriqlarni bir joyda',
    delay: 0.3,
  },
  {
    icon: '📈',
    title: "O'quvchilar rivojlanishi",
    description: 'Real vaqtda kuzatib boring',
    delay: 0.4,
  },
  {
    icon: '👨‍👩‍👦',
    title: 'Ota-onalar monitoringi',
    description: "Har doim aloqada bo'ling",
    delay: 0.5,
  },
]

/** Left panel — h-full, flex-col, justify-between: fits exactly inside viewport */
function LeftPanel() {
  return (
    <section
      className="hidden lg:flex flex-col h-full bg-gradient-hero px-8 xl:px-12 py-6 relative overflow-hidden"
      aria-label="MentorFlow platformasi haqida"
    >
      {/* Background blobs — purely decorative, pointer-events-none */}
      <div
        className="absolute -top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-32 -right-12 w-56 h-56 bg-blue-300/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP: Logo ── */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* ── MIDDLE: Heading + Description + Feature Cards ── */}
      <div className="flex flex-col flex-shrink-0 mt-5">
        {/* Heading */}
        <motion.h2
          className="text-[28px] xl:text-[34px] 2xl:text-[38px] font-bold text-heading
                     leading-[1.12] tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          Bilimingizni{' '}
          <span className="text-gradient">boshqarish</span>
          <br />
          endi yanada oson
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xs xl:text-sm text-body leading-relaxed mt-2.5 mb-4 max-w-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          MentorFlow orqali vazifalarni boshqaring, o'quvchilarni kuzating
          va ota-onalar bilan doimo aloqada bo'ling.
        </motion.p>

        {/* Feature cards */}
        <div
          className="flex flex-col gap-2.5"
          role="list"
          aria-label="Platforma imkoniyatlari"
        >
          {FEATURES.map((feat) => (
            <FeatureCard
              key={feat.title}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              delay={feat.delay}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM: Dashboard Illustration — flex-1 so it fills remaining space ── */}
      <div className="flex-1 flex items-end min-h-0 mt-4 overflow-hidden">
        <DashboardIllustration />
      </div>

      {/* Live-count pill — bottom-right corner */}
      <motion.div
        className="absolute bottom-5 right-5 bg-white/80 backdrop-blur-sm border border-border/60
                   rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
        <span className="text-[11px] font-medium text-heading">1,200+ faol o'quvchi</span>
      </motion.div>
    </section>
  )
}

/** Right panel — h-full, flex-col, centers the login card vertically, footer pinned inside card */
function RightPanel({ loginProps }) {
  return (
    <section
      className="flex flex-col h-full bg-bg dark:bg-gray-950
                 items-center justify-center px-4 sm:px-8 lg:px-10 overflow-y-auto"
      aria-label="Tizimga kirish bo'limi"
    >
      {/* Mobile-only logo */}
      <div className="lg:hidden mb-4 flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* Login card — footer is rendered inside it */}
      <div className="w-full flex justify-center">
        <LoginCard {...loginProps} />
      </div>
    </section>
  )
}

/**
 * Login page root — h-screen, no overflow, 2-column grid.
 * Behaves like Stripe / Vercel / Clerk auth pages.
 */
export default function LoginPage() {
  const loginProps = useLogin()

  return (
    <div
      className="h-screen w-screen overflow-hidden grid lg:grid-cols-[40%_60%] dark:bg-gray-950"
      role="document"
    >
      <LeftPanel />
      <RightPanel loginProps={loginProps} />
    </div>
  )
}
