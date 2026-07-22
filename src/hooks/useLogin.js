import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validation/loginSchema'

/**
 * Custom hook encapsulating login form logic, state, and submission.
 * @returns {{ form, onSubmit, isLoading, isSuccess, showPassword, togglePassword }}
 */
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  })

  /**
   * Simulates an API login call with a 2-second delay.
   * @param {import('../validation/loginSchema').LoginFormData} data
   */
  const onSubmit = async (data) => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('Login successful:', data)
      setIsSuccess(true)
      // Navigate to dashboard after short success flash
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (error) {
      console.error('Login error:', error)
      form.setError('root', {
        message: 'Kirish amalga oshmadi. Qaytadan urinib ko\'ring.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePassword = () => setShowPassword((prev) => !prev)

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    isSuccess,
    showPassword,
    togglePassword,
  }
}
