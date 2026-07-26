import { z } from 'zod';

export const adminGroupSchema = z
  .object({
    name: z.string().min(3, "Guruh nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
    mentor: z.string().min(1, 'Mentorni tanlang'),
    course: z.string().min(1, 'Kursni tanlang'),
    startDate: z.string().min(1, 'Boshlanish sanasini kiriting'),
    endDate: z.string().min(1, 'Tugash sanasini kiriting'),
    capacity: z.coerce
      .number({ invalid_type_error: "O'quvchilar sonini kiriting" })
      .int("O'quvchilar soni butun son bo'lishi kerak")
      .min(1, "Kamida 1 ta o'quvchi bo'lishi kerak")
      .max(200, 'Qiymat juda katta'),
    status: z.enum(['active', 'inactive'], {
      errorMap: () => ({ message: 'Holatni tanlang' }),
    }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak",
    path: ['endDate'],
  });
