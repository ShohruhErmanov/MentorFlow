import { motion } from 'framer-motion'

import Logo                  from '../components/Logo.jsx'
import FeatureCard           from '../components/FeatureCard.jsx'
import LoginCard             from '../components/LoginCard.jsx'
import DashboardIllustration from '../components/DashboardIllustration.jsx'
import { useLogin }          from '../hooks/useLogin.js'

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

/**
 * Left panel — 45% width, exact h-full, flex-col justify-between.
 * All content sits inside viewport with no overflow.
 */
function LeftPanel() {
  return (
    <section
      className="hidden lg:flex flex-col h-full bg-gradient-hero dark:bg-none dark:bg-slate-900 px-10 xl:px-14 py-8 relative overflow-hidden"
      aria-label="MentorFlow platformasi haqida"
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-40 -right-16 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 left-1/3 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* ── TOP: Logo ── */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* ── MIDDLE: Heading + Description + Feature Cards ── */}
      <div className="flex flex-col flex-shrink-0 mt-8 xl:mt-10">
        {/* Hero Heading */}
        <motion.h2
          className="font-bold text-heading dark:text-white leading-[1.05] tracking-tight max-w-[560px]"
          style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
        >
          Bilimingizni{' '}
          <span className="text-gradient">boshqarish</span>
          <br />
          endi yanada oson
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base xl:text-[17px] text-body dark:text-slate-400 leading-[1.7] mt-4 mb-6 max-w-[420px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          MentorFlow orqali vazifalarni boshqaring, o'quvchilarni kuzating
          va ota-onalar bilan doimo aloqada bo'ling.
        </motion.p>

        {/* Feature Cards */}
        <div
          className="flex flex-col gap-3"
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

      {/* ── BOTTOM: Illustration fills remaining space ── */}
      <div className="flex-1 flex items-end min-h-0 mt-6 overflow-hidden">
        <DashboardIllustration />
      </div>

      {/* Live-count pill */}
      <motion.div
        className="absolute bottom-6 right-6 bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm border border-border/60 dark:border-slate-700/60
                   rounded-full px-4 py-1.5 flex items-center gap-2 shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
        <span className="text-[11px] font-semibold text-heading dark:text-white">1,200+ faol o'quvchi</span>
      </motion.div>
    </section>
  )
}

/**
 * Right panel — 55% width, centers login card vertically.
 * overflow-hidden on this panel; card itself handles its own scroll if needed.
 */
function RightPanel({ loginProps }) {
  return (
    <section
      className="flex h-full bg-white dark:bg-slate-900 items-center justify-center
                 px-4 sm:px-8 lg:px-10 overflow-hidden"
      aria-label="Tizimga kirish bo'limi"
    >
      {/* Mobile-only logo */}
      <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
        <Logo size="md" />
      </div>

      {/* Login card */}
      <div className="w-full flex justify-center">
        <LoginCard {...loginProps} />
      </div>
    </section>
  )
}

/**
 * Login page root — h-screen, no overflow, 45/55 CSS grid.
 */
export default function LoginPage() {
  const loginProps = useLogin()

  return (
    <div
      className="h-screen w-screen overflow-hidden grid lg:grid-cols-[45%_55%]"
      role="document"
    >
      <LeftPanel />
      <RightPanel loginProps={loginProps} />
    </div>
  )
}
