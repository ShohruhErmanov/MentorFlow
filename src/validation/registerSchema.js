import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "Ism kiritish majburiy" })
      .min(2, { message: "Ism kamida 2 ta harfdan iborat bo'lishi kerak" })
      .max(50, { message: "Ism 50 ta belgidan oshmasligi kerak" }),

    lastName: z
      .string()
      .min(1, { message: "Familiya kiritish majburiy" })
      .min(2, { message: "Familiya kamida 2 ta harfdan iborat bo'lishi kerak" })
      .max(50, { message: "Familiya 50 ta belgidan oshmasligi kerak" }),

    email: z
      .string()
      .min(1, { message: "Elektron pochta kiritish majburiy" })
      .email({ message: "To'g'ri elektron pochta kiriting" }),

    phone: z
      .string()
      .min(1, { message: "Telefon raqam kiritish majburiy" })
      .regex(/^\+?[0-9\s\-()]{9,15}$/, { message: "To'g'ri telefon raqam kiriting" }),

    password: z
      .string()
      .min(1, { message: "Parol kiritish majburiy" })
      .min(8, { message: "Parol kamida 8 belgidan iborat bo'lishi kerak" })
      .regex(/[A-Z]/, { message: "Parolda kamida bitta katta harf bo'lishi kerak" })
      .regex(/[0-9]/, { message: "Parolda kamida bitta raqam bo'lishi kerak" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Parolni tasdiqlash majburiy" }),

    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "Foydalanish shartlariga rozilik bildiring",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parollar mos kelmaydi",
    path: ['confirmPassword'],
  })

/** @typedef {z.infer<typeof registerSchema>} RegisterFormData */
