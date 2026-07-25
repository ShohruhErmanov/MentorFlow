import { CalendarCheck, CreditCard, GraduationCap, Layers, Users } from 'lucide-react';

export const adminActivityCount = 124;

export const adminStats = [
  {
    id: 'students',
    label: "Jami o'quvchilar",
    value: '1,284',
    trend: '+12%',
    trendTone: 'positive',
    icon: GraduationCap,
    tone: 'blue',
  },
  {
    id: 'mentors',
    label: 'Jami mentorlar',
    value: '48',
    trend: '+4',
    trendTone: 'positive',
    icon: Users,
    tone: 'orange',
  },
  {
    id: 'groups',
    label: 'Jami guruhlar',
    value: '36',
    trend: 'Faol 32',
    trendTone: 'neutral',
    icon: Layers,
    tone: 'rose',
  },
  {
    id: 'attendance',
    label: 'Bugungi davomat',
    value: '842',
    trend: '92%',
    trendTone: 'positive',
    icon: CalendarCheck,
    tone: 'red',
  },
  {
    id: 'payments',
    label: "To'lov holati",
    value: '98 mln',
    trend: "85% to'landi",
    trendTone: 'positive',
    icon: CreditCard,
    tone: 'green',
  },
];

export const studentGrowthData = [
  { month: 'Yan', students: 620 },
  { month: 'Fev', students: 780 },
  { month: 'Mar', students: 705 },
  { month: 'Apr', students: 960 },
  { month: 'May', students: 1080 },
  { month: 'Iyun', students: 1284 },
];

export const revenueTotalLabel = '142M';

export const revenueBreakdown = [
  { label: "Kurs to'lovlari", percent: 68, color: '#2563eb' },
  { label: 'Kitoblar', percent: 22, color: '#191b23' },
  { label: 'Boshqa', percent: 10, color: '#f97316' },
];

export const recentPayments = [
  {
    id: 1,
    student: { name: 'Alisher Azimov', initials: 'AA' },
    group: 'Frontend React',
    amount: '1,200,000',
    currency: 'UZS',
    date: 'Bugun, 14:20',
    status: 'success',
  },
  {
    id: 2,
    student: { name: 'Malika Yusupova', initials: 'MY' },
    group: 'UI/UX Dizayn',
    amount: '950,000',
    currency: 'UZS',
    date: 'Kecha, 09:40',
    status: 'success',
  },
  {
    id: 3,
    student: { name: 'Sardor Raxmatov', initials: 'SR' },
    group: 'Backend Python',
    amount: '1,500,000',
    currency: 'UZS',
    date: '2 kun oldin',
    status: 'pending',
  },
  {
    id: 4,
    student: { name: 'Dilnoza Toshmatova', initials: 'DT' },
    group: 'Frontend Pro',
    amount: '1,200,000',
    currency: 'UZS',
    date: '3 kun oldin',
    status: 'success',
  },
];

export const pendingAssignments = [
  {
    id: 1,
    title: 'Uyga vazifa #12: API Integration',
    group: 'FN-24',
    student: 'Bobur S.',
  },
  {
    id: 2,
    title: 'Creative Writing: Narrative',
    group: 'ENG-11',
    student: 'Nodira Q.',
  },
  {
    id: 3,
    title: 'Backend loyihasi: Auth moduli',
    group: 'BE-08',
    student: 'Jasur T.',
  },
];
