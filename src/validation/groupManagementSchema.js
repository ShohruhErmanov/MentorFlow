import { z } from 'zod';

export const groupManagementSchema = z
  .object({
    name: z.string().min(3, "Guruh nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
    course: z.string().min(1, 'Kursni tanlang'),
    mentorName: z.string().min(1, 'Mentorni tanlang'),
    startDate: z.string().min(1, 'Boshlanish sanasini kiriting'),
    endDate: z.string().min(1, 'Tugash sanasini kiriting'),
    weekdays: z.array(z.string()).min(1, 'Kamida bitta dars kunini tanlang'),
    startTime: z.string().min(1, 'Boshlanish vaqtini kiriting'),
    endTime: z.string().min(1, 'Tugash vaqtini kiriting'),
    capacity: z.coerce
      .number({ invalid_type_error: "Maksimal o'quvchilar sonini kiriting" })
      .int("Butun son bo'lishi kerak")
      .min(1, "Kamida 1 ta o'quvchi bo'lishi kerak")
      .max(200, 'Qiymat juda katta'),
    room: z.string().min(1, "Xonani kiriting"),
    status: z.enum(['active', 'inactive'], { errorMap: () => ({ message: 'Holatni tanlang' }) }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tugash sanasi boshlanish sanasidan keyin bo'lishi kerak",
    path: ['endDate'],
  });
