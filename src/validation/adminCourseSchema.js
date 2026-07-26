import { z } from 'zod';

export const adminCourseSchema = z.object({
  name: z.string().min(3, "Kurs nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  description: z.string().min(10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak"),
  duration: z.string().min(1, 'Davomiyligini kiriting'),
  price: z.coerce
    .number({ invalid_type_error: 'Narxni kiriting' })
    .min(0, "Narx manfiy bo'lishi mumkin emas"),
  mentor: z.string().min(1, 'Mentorni tanlang'),
  status: z.enum(['active', 'inactive'], {
    errorMap: () => ({ message: 'Holatni tanlang' }),
  }),
});
