import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Foydalanuvchi nomini kiritish majburiy" }),
  password: z
    .string()
    .min(1, { message: "Parol kiritish majburiy" })
    .min(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" }),
  rememberMe: z.boolean().optional().default(false),
})

/** @typedef {z.infer<typeof loginSchema>} LoginFormData */
