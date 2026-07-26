import { z } from 'zod';

/**
 * Schema factory so the username-uniqueness check can be validated against
 * the current list of taken usernames at the moment the modal is opened.
 *
 * @param {string[]} existingUsernames
 * @param {{ requirePassword?: boolean }} [options] - Pass requirePassword: false
 *   when editing an existing user, where leaving the password blank means "keep it unchanged".
 */
export function createUserSchema(existingUsernames = [], { requirePassword = true } = {}) {
  const taken = existingUsernames.map((username) => username.toLowerCase());

  const passwordField = requirePassword
    ? z.string().min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")
    : z
        .string()
        .optional()
        .refine((value) => !value || value.length >= 6, {
          message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
        });

  const confirmPasswordField = requirePassword
    ? z.string().min(1, 'Parolni tasdiqlash majburiy')
    : z.string().optional();

  return z
    .object({
      firstName: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
      lastName: z.string().min(2, "Familiya kamida 2 ta belgidan iborat bo'lishi kerak"),
      username: z
        .string()
        .min(3, "Username kamida 3 ta belgidan iborat bo'lishi kerak")
        .regex(/^[a-zA-Z0-9_.]+$/, "Username faqat harf, raqam, '_' va '.' belgilaridan iborat bo'lishi kerak")
        .refine((value) => !taken.includes(value.toLowerCase()), {
          message: 'Bu username allaqachon band',
        }),
      email: z.string().min(1, 'Email kiritish majburiy').email("To'g'ri email manzil kiriting"),
      phone: z.string().regex(/^\+?[0-9\s\-()]{9,15}$/, "Telefon raqami noto'g'ri formatda"),
      role: z.enum(['admin', 'mentor', 'student', 'parent'], {
        errorMap: () => ({ message: 'Rolni tanlang' }),
      }),
      password: passwordField,
      confirmPassword: confirmPasswordField,
      status: z.enum(['active', 'inactive', 'blocked']).default('active'),
    })
    .refine((data) => (data.password || data.confirmPassword ? data.password === data.confirmPassword : true), {
      message: 'Parollar mos kelmadi',
      path: ['confirmPassword'],
    });
}
