import { z } from 'zod';

/**
 * Schema factory so the username-uniqueness check can be validated against
 * the current list of taken usernames at the moment the modal is opened.
 */
export function createStudentSchema(existingUsernames = []) {
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
    birthDate: z.string().min(1, "Tug'ilgan sanani kiriting"),
    gender: z.enum(['male', 'female'], { errorMap: () => ({ message: 'Jinsni tanlang' }) }),
    mentorName: z.string().min(1, 'Mentorni tanlang'),
    group: z.string().min(1, 'Guruhni tanlang'),
    parentName: z.string().min(2, "Ota-ona ismini kiriting"),
    paymentStatus: z.enum(['paid', 'debt', 'pending'], {
      errorMap: () => ({ message: "To'lov holatini tanlang" }),
    }),
    status: z.enum(['active', 'inactive', 'graduated', 'blocked'], {
      errorMap: () => ({ message: 'Holatni tanlang' }),
    }),
  });
}
