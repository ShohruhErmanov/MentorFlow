import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validation/loginSchema'
import { useAuth } from '../contexts/AuthContext'
import { getDefaultPathForRole } from '../routes/roleRoutes'

/**
 * Custom hook encapsulating login form logic, state, and submission.
 * @returns {{ form, onSubmit, isLoading, isSuccess, showPassword, togglePassword }}
 */
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onTouched',
  })

  /**
   * Validates credentials against mock users and stores the session in AuthContext.
   * @param {import('../validation/loginSchema').LoginFormData} data
   */
  const onSubmit = async (data) => {
    setIsLoading(true)
    setIsSuccess(false)
    try {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800))
      const user = login(data.username, data.password)

      if (!user) {
        form.setError('root', {
          message: "Foydalanuvchi nomi yoki parol noto'g'ri.",
        })
        return
      }

      setIsSuccess(true)
      setTimeout(() => navigate(getDefaultPathForRole(user.role), { replace: true }), 800)
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
