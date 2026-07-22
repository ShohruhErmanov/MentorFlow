import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../validation/registerSchema'

/**
 * Password strength scorer — returns { score: 0-4, label, color }
 * @param {string} password
 */
export function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }

  let score = 0
  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  // Normalize to 1-3
  if (score <= 1) return { score: 1, label: "Zaif",     color: "bg-red-500"    }
  if (score <= 3) return { score: 2, label: "O'rtacha", color: "bg-amber-400"  }
  return           { score: 3, label: "Kuchli",   color: "bg-emerald-500" }
}

/**
 * Custom hook encapsulating register form logic.
 */
export function useRegister() {
  const [isLoading, setIsLoading]         = useState(false)
  const [isSuccess, setIsSuccess]         = useState(false)
  const [showPassword, setShowPassword]   = useState(false)
  const [showConfirm,  setShowConfirm]    = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName:      '',
      lastName:       '',
      email:          '',
      phone:          '',
      password:       '',
      confirmPassword:'',
      agreeToTerms:   false,
    },
    mode: 'onTouched',
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Register successful:', data)
      setIsSuccess(true)
    } catch (error) {
      form.setError('root', { message: "Ro'yxatdan o'tishda xatolik. Qaytadan urinib ko'ring." })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    onSubmit:        form.handleSubmit(onSubmit),
    isLoading,
    isSuccess,
    showPassword,
    showConfirm,
    togglePassword:  () => setShowPassword((p) => !p),
    toggleConfirm:   () => setShowConfirm((p)  => !p),
  }
}
