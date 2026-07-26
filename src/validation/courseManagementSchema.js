import { z } from 'zod';

export const courseManagementSchema = z.object({
  name: z.string().min(3, "Kurs nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  category: z.string().min(1, 'Kategoriyani tanlang'),
  shortDescription: z.string().min(10, "Qisqacha tavsif kamida 10 ta belgidan iborat bo'lishi kerak"),
  fullDescription: z.string().min(20, "To'liq tavsif kamida 20 ta belgidan iborat bo'lishi kerak"),
  duration: z.string().min(1, 'Davomiyligini kiriting'),
  price: z.coerce
    .number({ invalid_type_error: 'Narxni kiriting' })
    .min(0, "Narx manfiy bo'lishi mumkin emas"),
  mentorName: z.string().min(1, 'Mentorni tanlang'),
  status: z.enum(['active', 'upcoming', 'inactive'], { errorMap: () => ({ message: 'Holatni tanlang' }) }),
});
