import { z } from 'zod';

export const assignmentManagementSchema = z
  .object({
    title: z.string().min(3, "Vazifa nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
    course: z.string().min(1, 'Kursni tanlang'),
    group: z.string().min(1, 'Guruhni tanlang'),
    mentorName: z.string().min(1, 'Mentorni tanlang'),
    shortDescription: z.string().min(10, "Tavsif kamida 10 ta belgidan iborat bo'lishi kerak"),
    requirements: z.string().min(10, "Talablar kamida 10 ta belgidan iborat bo'lishi kerak"),
    maxScore: z.coerce
      .number({ invalid_type_error: 'Maksimal ballni kiriting' })
      .int("Butun son bo'lishi kerak")
      .positive("Maksimal ball 0 dan katta bo'lishi kerak"),
    deadline: z.string().min(1, 'Topshirish muddatini kiriting'),
  })
  .refine((data) => new Date(data.deadline) >= new Date(), {
    message: "Muddat o'tmishda bo'lishi mumkin emas",
    path: ['deadline'],
  });
