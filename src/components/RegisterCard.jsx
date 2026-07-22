import { useWatch } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, Shield, CheckCircle2, ArrowRight } from 'lucide-react'


import InputField     from './InputField.jsx'
import Button         from './Button.jsx'
import SocialButton   from './SocialButton.jsx'
import Checkbox       from './Checkbox.jsx'
import Footer         from './Footer.jsx'
import PasswordStrength from './PasswordStrength.jsx'

/**
 * Premium registration card — 540px wide, fits inside 100vh right panel.
 * Matches Login page design system (same shadows, radius, tokens).
 */
export default function RegisterCard({
  form,
  onSubmit,
  isLoading,
  isSuccess,
  showPassword,
  showConfirm,
  togglePassword,
  toggleConfirm,
}) {
  const { register, formState: { errors }, control } = form
  const rootError    = form.formState.errors.root
  const agreeToTerms = useWatch({ control, name: 'agreeToTerms' })
  const password     = useWatch({ control, name: 'password' })

  /* ─── Stagger variants ─── */
  const cardVariants = {
    hidden:  { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1,
               transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }
  const row = (i) => ({
    hidden:  { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0,
               transition: { duration: 0.32, delay: 0.06 + i * 0.06, ease: 'easeOut' } },
  })

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[540px] bg-white rounded-[28px] shadow-xl border border-slate-200
                 px-8 py-6 dark:bg-gray-900 dark:border-gray-700"
      role="main"
      aria-label="Ro'yxatdan o'tish formasi"
    >
      {/* ── Success banner ── */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            className="mb-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} role="alert"
          >
            <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
            <p className="text-xs font-medium text-emerald-700">
              Muvaffaqiyatli ro'yxatdan o'tdingiz! Yo'naltirilmoqda...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {rootError && (
          <motion.div
            className="mb-4 flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} role="alert"
          >
            <p className="text-xs font-medium text-red-600">{rootError.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Heading ── */}
      <motion.div className="text-center mb-4" variants={row(0)} initial="hidden" animate="visible">
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight leading-tight dark:text-white">
          Ro'yxatdan o'tish
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Yangi akkaunt yarating va platformadan foydalanishni boshlang.
        </p>
      </motion.div>

      {/* ── Form ── */}
      <form onSubmit={onSubmit} noValidate aria-label="Ro'yxatdan o'tish formasi" className="space-y-2.5">

        {/* Row 1: First + Last name */}
        <motion.div className="grid grid-cols-2 gap-3" variants={row(1)} initial="hidden" animate="visible">
          <InputField
            id="firstName"
            label="Ism"
            placeholder="Ismingizni kiriting"
            leftIcon={User}
            error={errors.firstName?.message}
            disabled={isLoading || isSuccess}
            autoComplete="given-name"
            autoFocus
            {...register('firstName')}
          />
          <InputField
            id="lastName"
            label="Familiya"
            placeholder="Familiyangizni kiriting"
            leftIcon={User}
            error={errors.lastName?.message}
            disabled={isLoading || isSuccess}
            autoComplete="family-name"
            {...register('lastName')}
          />
        </motion.div>

        {/* Row 2: Email */}
        <motion.div variants={row(2)} initial="hidden" animate="visible">
          <InputField
            id="email"
            label="Elektron pochta"
            type="email"
            placeholder="Elektron pochtangizni kiriting"
            leftIcon={Mail}
            error={errors.email?.message}
            disabled={isLoading || isSuccess}
            autoComplete="email"
            {...register('email')}
          />
        </motion.div>

        {/* Row 3: Phone */}
        <motion.div variants={row(3)} initial="hidden" animate="visible">
          <InputField
            id="phone"
            label="Telefon raqami"
            type="tel"
            placeholder="+998 90 000 00 00"
            leftIcon={Phone}
            error={errors.phone?.message}
            disabled={isLoading || isSuccess}
            autoComplete="tel"
            {...register('phone')}
          />
        </motion.div>

        {/* Row 4: Password columns */}
        <motion.div className="grid grid-cols-2 gap-3" variants={row(4)} initial="hidden" animate="visible">
          <div>
            <InputField
              id="password"
              label="Parol"
              type="password"
              placeholder="Parolni kiriting"
              leftIcon={Lock}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={togglePassword}
              error={errors.password?.message}
              disabled={isLoading || isSuccess}
              autoComplete="new-password"
              {...register('password')}
            />
            <PasswordStrength password={password} />
          </div>
          <InputField
            id="confirmPassword"
            label="Parolni tasdiqlang"
            type="password"
            placeholder="Parolni qayta kiriting"
            leftIcon={Shield}
            showPasswordToggle
            showPassword={showConfirm}
            onTogglePassword={toggleConfirm}
            error={errors.confirmPassword?.message}
            disabled={isLoading || isSuccess}
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
        </motion.div>

        {/* Row 5: Terms checkbox */}
        <motion.div variants={row(5)} initial="hidden" animate="visible">
          <label className="flex items-start gap-2.5 cursor-pointer group select-none">
            <input
              type="checkbox"
              className="sr-only peer"
              disabled={isLoading || isSuccess}
              {...register('agreeToTerms')}
            />
            {/* Custom checkbox */}
            <div className="relative mt-0.5 w-[18px] h-[18px] flex-shrink-0 rounded-[5px] border-2 border-slate-300
                            bg-white transition-all duration-200
                            peer-checked:bg-primary peer-checked:border-primary
                            peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30
                            group-hover:border-primary/60"
                 aria-hidden="true">
              <motion.svg
                viewBox="0 0 10 8" fill="none"
                className="absolute inset-0 m-auto w-3 h-2.5"
              >
                <motion.path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: agreeToTerms ? 1 : 0, opacity: agreeToTerms ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </motion.svg>
            </div>
            <span className="text-[11px] leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">
              Men{' '}
              <a href="#terms" className="font-semibold text-primary hover:underline underline-offset-2">
                foydalanish shartlari
              </a>
              {' '}va{' '}
              <a href="#privacy" className="font-semibold text-primary hover:underline underline-offset-2">
                maxfiylik siyosati
              </a>
              ga roziman.
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-[10px] font-medium text-red-500 mt-1 flex items-center gap-1">
              {errors.agreeToTerms.message}
            </p>
          )}
        </motion.div>

        {/* ── Submit button ── */}
        <motion.div variants={row(6)} initial="hidden" animate="visible" className="pt-0.5">
          <motion.button
            type="submit"
            disabled={isLoading || isSuccess}
            className="relative w-full h-[48px] rounded-xl font-semibold text-sm text-white
                       bg-gradient-to-r from-blue-600 to-blue-500
                       shadow-md shadow-blue-500/25
                       hover:shadow-lg hover:shadow-blue-500/35 hover:from-blue-700 hover:to-blue-600
                       transition-all duration-200
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50
                       disabled:opacity-60 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2 overflow-hidden"
            whileHover={!isLoading && !isSuccess ? { scale: 1.01, y: -1 } : {}}
            whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-busy={isLoading}
          >
            {/* Shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                             translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"
                  aria-hidden="true" />
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <span>Ro'yxatdan o'tilmoqda...</span>
              </>
            ) : (
              <>
                <span>Ro'yxatdan o'tish</span>
                <ArrowRight size={15} />
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* ── Divider ── */}
      <motion.div
        className="flex items-center gap-3 my-3"
        variants={row(7)} initial="hidden" animate="visible"
        aria-hidden="true"
      >
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
        <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase px-1">Yoki</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-gray-700" />
      </motion.div>

      {/* ── Social buttons ── */}
      <motion.div className="grid grid-cols-2 gap-2" variants={row(8)} initial="hidden" animate="visible">
        <SocialButton provider="google" disabled={isLoading || isSuccess} onClick={() => {}} />
        <SocialButton provider="github" disabled={isLoading || isSuccess} onClick={() => {}} />
      </motion.div>

      {/* ── Login link ── */}
      <motion.p
        className="text-center text-[11px] text-slate-500 mt-3"
        variants={row(9)} initial="hidden" animate="visible"
      >
        Akkauntingiz bormi?{' '}
        <Link
          to="/"
          className="font-semibold text-primary hover:text-primary-hover hover:underline
                     underline-offset-2 transition-colors duration-150"
          aria-label="Kirish sahifasiga o'tish"
        >
          Kirish
        </Link>
      </motion.p>

      {/* ── Footer ── */}
      <motion.div
        className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-700"
        variants={row(10)} initial="hidden" animate="visible"
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
