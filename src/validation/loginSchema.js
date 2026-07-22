import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email manzil kiritish majburiy" })
    .email({ message: "To'g'ri email manzil kiriting" }),
  password: z
    .string()
    .min(1, { message: "Parol kiritish majburiy" })
    .min(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" }),
  rememberMe: z.boolean().optional().default(false),
})

/** @typedef {z.infer<typeof loginSchema>} LoginFormData */
