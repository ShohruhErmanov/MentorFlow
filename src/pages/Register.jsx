import { motion } from 'framer-motion'

import Logo                  from '../components/Logo.jsx'
import FeatureCard           from '../components/FeatureCard.jsx'
import RegisterCard          from '../components/RegisterCard.jsx'
import DashboardIllustration from '../components/DashboardIllustration.jsx'
import { useRegister }       from '../hooks/useRegister.js'

const FEATURES = [
  { icon: '🚀', title: "Tezkor o'rganish",   description: "AI yordamida shaxsiy dars rejasi",  delay: 0.3 },
  { icon: '📊', title: "Rivojlanish tahlili", description: "Har bir qadamni kuzatib boring",    delay: 0.4 },
  { icon: '🤝', title: "Hamkorlik muhiti",    description: "Mentor va o'quvchilar bilan",       delay: 0.5 },
]

/**
 * Left panel — identical structure to Login, 45% column, different copy.
 */
function LeftPanel() {
  return (
    <section
      className="hidden lg:flex flex-col h-full bg-gradient-hero px-10 xl:px-14 py-8 relative overflow-hidden"
      aria-label="MentorFlow haqida"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-32 -right-12 w-60 h-60 bg-indigo-300/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* ── TOP: Logo ── */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* ── MIDDLE: Heading + Description + Feature Cards ── */}
      <div className="flex flex-col flex-shrink-0 mt-8 xl:mt-10">
        {/* Hero Heading */}
        <motion.h2
          className="font-bold text-heading leading-[1.05] tracking-tight max-w-[560px]"
          style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          Kelajagingizni{' '}
          <span className="text-gradient">bugundan</span>
          <br />
          boshlang
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base xl:text-[17px] text-body leading-[1.7] mt-4 mb-6 max-w-[420px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
        >
          MentorFlow platformasiga qo'shiling va mentorlar,
          o'quvchilar hamda ota-onalarni yagona tizimda birlashtiring.
        </motion.p>

        {/* Feature Cards */}
        <div className="flex flex-col gap-3" role="list" aria-label="Platforma imkoniyatlari">
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
        className="absolute bottom-6 right-6 bg-white/85 backdrop-blur-sm border border-border/60
                   rounded-full px-4 py-1.5 flex items-center gap-2 shadow-card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.0 }}
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
        <span className="text-[11px] font-semibold text-heading">1,200+ faol o'quvchi</span>
      </motion.div>
    </section>
  )
}

/**
 * Right panel — 55% width, centers RegisterCard vertically.
 * overflow-hidden keeps content inside 100vh.
 */
function RightPanel({ registerProps }) {
  return (
    <section
      className="flex h-full bg-white dark:bg-gray-950 items-center justify-center
                 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Ro'yxatdan o'tish bo'limi"
    >
      {/* Mobile-only logo */}
      <div className="lg:hidden absolute top-6 left-1/2 -translate-x-1/2">
        <Logo size="md" />
      </div>

      {/* Register card */}
      <div className="w-full flex justify-center">
        <RegisterCard {...registerProps} />
      </div>
    </section>
  )
}

/**
 * Register page — h-screen, no document scroll, 45/55 CSS grid.
 * Mirror of LoginPage structure.
 */
export default function RegisterPage() {
  const registerProps = useRegister()

  return (
    <div
      className="h-screen w-screen overflow-hidden grid lg:grid-cols-[45%_55%]"
      role="document"
    >
      <LeftPanel />
      <RightPanel registerProps={registerProps} />
    </div>
  )
}
