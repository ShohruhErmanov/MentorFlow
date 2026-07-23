import { z } from 'zod';

export const groupSchema = z.object({
  name: z.string().min(3, "Guruh nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  course: z.string().min(1, 'Kursni tanlang'),
  mentor: z.string().min(3, 'Mentor ismini kiriting'),
  startDate: z.string().min(1, 'Boshlanish sanasini kiriting'),
  endDate: z.string().min(1, 'Tugash sanasini kiriting'),
  schedule: z.string().min(1, 'Dars kunlarini kiriting'),
  time: z.string().min(1, 'Dars vaqtini kiriting'),
  capacity: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .refine((val) => val > 0 && val <= 50, "O'quvchilar soni 1-50 oralig'ida bo'lishi kerak"),
});
