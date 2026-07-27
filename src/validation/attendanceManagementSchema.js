import { z } from 'zod';

export const markAttendanceSchema = z.object({
  date: z.string().min(1, 'Sanani tanlang'),
  course: z.string().min(1, 'Kursni tanlang'),
  group: z.string().min(1, 'Guruhni tanlang'),
  mentorName: z.string().min(1, 'Mentorni tanlang'),
  studentIds: z.array(z.string()).min(1, 'Kamida bitta o\'quvchini tanlang'),
  status: z.string().min(1, 'Holatni tanlang'),
  comment: z.string().optional(),
});

export const editAttendanceSchema = z.object({
  date: z.string().min(1, 'Sanani tanlang'),
  status: z.string().min(1, 'Holatni tanlang'),
  comment: z.string().optional(),
});
