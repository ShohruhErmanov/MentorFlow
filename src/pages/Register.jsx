import { motion } from 'framer-motion'

import Logo                  from '../components/Logo.jsx'
import FeatureCard           from '../components/FeatureCard.jsx'
import RegisterCard          from '../components/RegisterCard.jsx'
import DashboardIllustration from '../components/DashboardIllustration.jsx'
import { useRegister }       from '../hooks/useRegister.js'

const FEATURES = [
  { icon: '🚀', title: "Tezkor o'rganish",      description: "AI yordamida shaxsiy dars rejasi", delay: 0.3 },
  { icon: '📊', title: "Rivojlanish tahlili",    description: "Har bir qadamni kuzatib boring",   delay: 0.4 },
  { icon: '🤝', title: "Hamkorlik muhiti",       description: "Mentor va o'quvchilar bilan",      delay: 0.5 },
]

/** Left panel — identical structure to Login, different copy */
function LeftPanel() {
  return (
    <section
      className="hidden lg:flex flex-col h-full bg-gradient-hero px-8 xl:px-12 py-6 relative overflow-hidden"
      aria-label="MentorFlow haqida"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-24 -right-10 w-52 h-52 bg-indigo-300/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* ── TOP: Logo ── */}
      <div className="flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* ── MIDDLE: Headline + Description + Feature Cards ── */}
      <div className="flex flex-col flex-shrink-0 mt-5">
        {/* Headline — 3 lines, "bugundan" highlighted */}
        <motion.h2
          className="font-bold text-slate-900 leading-[1.08] tracking-tight"
          style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          Kelajagingizni
          <br />
          <span className="text-gradient">bugundan</span>
          <br />
          boshlang
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xs xl:text-sm text-body leading-relaxed mt-2.5 mb-4 max-w-[320px]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
        >
          MentorFlow platformasiga qo'shiling va mentorlar,
          o'quvchilar hamda ota-onalarni yagona tizimda birlashtiring.
        </motion.p>

        {/* Feature Cards */}
        <div className="flex flex-col gap-2.5" role="list" aria-label="Platforma imkoniyatlari">
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
      <div className="flex-1 flex items-end min-h-0 mt-4 overflow-hidden">
        <DashboardIllustration />
      </div>

      {/* Live user count pill */}
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

/** Right panel — vertically centers RegisterCard, overflow-y-auto for very short viewports */
function RightPanel({ registerProps }) {
  return (
    <section
      className="flex flex-col h-full bg-bg dark:bg-gray-950
                 items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto"
      aria-label="Ro'yxatdan o'tish bo'limi"
    >
      {/* Mobile-only logo */}
      <div className="lg:hidden mb-4 flex-shrink-0">
        <Logo size="md" />
      </div>

      {/* Register card */}
      <div className="w-full flex justify-center py-3">
        <RegisterCard {...registerProps} />
      </div>
    </section>
  )
}

/**
 * Register page — h-screen, no document scroll, 40/60 grid.
 * Mirror of LoginPage structure.
 */
export default function RegisterPage() {
  const registerProps = useRegister()

  return (
    <div
      className="h-screen w-screen overflow-hidden grid lg:grid-cols-[40%_60%] dark:bg-gray-950"
      role="document"
    >
      <LeftPanel />
      <RightPanel registerProps={registerProps} />
    </div>
  )
}
