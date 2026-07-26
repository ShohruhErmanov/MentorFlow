import { z } from 'zod';

/**
 * Schema factory so the username-uniqueness check can be validated against
 * the current list of taken usernames at the moment the modal is opened.
 */
export function createMentorSchema(existingUsernames = []) {
  const taken = existingUsernames.map((username) => username.toLowerCase());

  return z.object({
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
    specialization: z.string().min(1, 'Mutaxassislikni tanlang'),
    experienceYears: z.coerce
      .number({ invalid_type_error: 'Tajribani kiriting' })
      .int("Butun son bo'lishi kerak")
      .min(0, "Tajriba manfiy bo'lishi mumkin emas")
      .max(60, 'Qiymat juda katta'),
    groups: z.string().optional(),
    bio: z.string().min(10, "Bio kamida 10 ta belgidan iborat bo'lishi kerak"),
    avatarUrl: z.string().optional(),
    status: z.enum(['active', 'inactive'], {
      errorMap: () => ({ message: 'Holatni tanlang' }),
    }),
  });
}
