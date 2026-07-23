import { z } from 'zod';

export const groupSchema = z.object({
  name: z.string().min(3, "Guruh nomi kamida 3 ta belgidan iborat bo'lishi kerak"),
  course: z.string().min(1, 'Kursni tanlang'),
  mentor: z.string().min(3, 'Mentor ismini kiriting'),
  startDate: z.string().min(1, 'Boshlanish sanasini kiriting'),
  endDate: z.string().min(1, 'Tugash sanasini kiriting'),
  weekdays: z.array(z.string()).min(1, 'Kamida bitta kunni tanlang'),
  startTime: z.string().min(1, 'Boshlanish vaqtini kiriting'),
  endTime: z.string().min(1, 'Tugash vaqtini kiriting'),
  capacity: z.coerce.number().min(1, "O'quvchilar sonini kiriting"),
  description: z.string().optional(),
  status: z.enum(['Faol', 'Yakunlangan', 'Arxiv']).default('Faol'),
});
