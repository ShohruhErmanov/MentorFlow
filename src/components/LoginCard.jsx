import { useWatch } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Lock, CheckCircle2 } from 'lucide-react'

import InputField   from './InputField.jsx'
import SocialButton from './SocialButton.jsx'
import Checkbox     from './Checkbox.jsx'
import Footer       from './Footer.jsx'

/**
 * Premium login card — max-w-[520px], max-h-[640px].
 * Padding 36px, blue-gradient submit button, no-scroll by design.
 */
export default function LoginCard({
  form,
  onSubmit,
  isLoading,
  isSuccess,
  showPassword,
  togglePassword,
}) {
  const {
    register,
    formState: { errors },
    control,
  } = form

  const rememberMe = useWatch({ control, name: 'rememberMe' })
  const rootError  = form.formState.errors.root

  const cardVariants = {
    hidden:  { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const fieldVariants = {
    hidden:  { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.35, delay: 0.08 + i * 0.07, ease: 'easeOut' },
    }),
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[520px] bg-white rounded-[28px] shadow-auth-card border border-slate-200/80
                 px-9 py-6 dark:bg-gray-900 dark:border-gray-700
                 max-h-[calc(100vh-40px)] overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
      role="main"
      aria-label="Login form card"
    >
      {/* ── Banners ── */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="mb-4 flex items-center gap-2.5 bg-success/10 border border-success/25 rounded-xl px-3.5 py-2.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
          >
            <CheckCircle2 size={16} className="text-success flex-shrink-0" />
            <p className="text-xs font-medium text-success">Muvaffaqiyatli kirdingiz! Yo'naltirilmoqda...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {rootError && (
          <motion.div
            className="mb-4 flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
          >
            <p className="text-xs font-medium text-red-600">{rootError.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Heading ── */}
      <motion.div
        className="mb-4"
        custom={0}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-[28px] font-bold text-heading tracking-tight leading-tight mb-1 dark:text-white">
          Tizimga kirish
        </h1>
        <p className="text-sm text-body dark:text-gray-400">
          Hisobingizga kiring va ishlarni davom ettiring.
        </p>
      </motion.div>

      {/* ── Form ── */}
      <form onSubmit={onSubmit} noValidate aria-label="Login form" className="space-y-3.5">

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <InputField
            id="email"
            label="Elektron pochta"
            type="email"
            placeholder="Elektron pochtangizni kiriting"
            leftIcon={Mail}
            error={errors.email?.message}
            disabled={isLoading || isSuccess}
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
        </motion.div>

        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <InputField
            id="password"
            label="Parol"
            type="password"
            placeholder="Parolingizni kiriting"
            leftIcon={Lock}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={togglePassword}
            rightLabel="Parolni unutdingizmi?"
            onRightLabelClick={() => console.log('Forgot password')}
            error={errors.password?.message}
            disabled={isLoading || isSuccess}
            autoComplete="current-password"
            {...register('password')}
          />
        </motion.div>

        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <Checkbox
            id="rememberMe"
            label="Meni eslab qol"
            disabled={isLoading || isSuccess}
            checked={rememberMe}
            {...register('rememberMe')}
          />
        </motion.div>

        {/* ── Submit button — blue gradient, h-[54px] ── */}
        <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible" className="pt-1">
          <motion.button
            type="submit"
            disabled={isLoading || isSuccess}
            className="relative w-full h-[54px] rounded-xl font-semibold text-sm text-white
                       bg-gradient-to-r from-blue-600 to-primary
                       shadow-md shadow-primary/25
                       hover:shadow-lg hover:shadow-primary/35 hover:from-blue-700 hover:to-blue-600
                       transition-all duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
                       disabled:opacity-60 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 overflow-hidden"
            whileHover={!isLoading && !isSuccess ? { scale: 1.01, y: -1 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-busy={isLoading}
            aria-label="Tizimga kirish"
          >
            {/* Shimmer */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                         translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
              aria-hidden="true"
            />
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span>Kirilmoqda...</span>
              </>
            ) : (
              <span>Tizimga kirish</span>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* ── Divider ── */}
      <motion.div
        className="flex items-center gap-3 my-4"
        custom={5}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-border dark:bg-gray-700" />
        <span className="text-[11px] font-semibold text-body/60 tracking-widest uppercase px-1">Yoki</span>
        <div className="flex-1 h-px bg-border dark:bg-gray-700" />
      </motion.div>

      {/* ── Social buttons ── */}
      <motion.div
        className="space-y-2.5"
        custom={6}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <SocialButton provider="google" disabled={isLoading || isSuccess} onClick={() => {}} />
        <SocialButton provider="github" disabled={isLoading || isSuccess} onClick={() => {}} />
      </motion.div>

      {/* ── Register link ── */}
      <motion.p
        className="text-center text-sm text-body mt-4 dark:text-gray-400"
        custom={7}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        Hisobingiz yo'qmi?{' '}
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-primary-hover transition-colors duration-150
                     hover:underline underline-offset-2 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          aria-label="Ro'yxatdan o'tish sahifasiga o'tish"
        >
          Ro'yxatdan o'tish
        </Link>
      </motion.p>

      {/* ── Footer ── */}
      <motion.div
        className="mt-4 pt-3 border-t border-border/40 dark:border-gray-700"
        custom={8}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
