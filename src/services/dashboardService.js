import {
  AlertTriangle,
  BookOpen,
  CalendarCheck,
  CheckSquare,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Trophy,
  Users,
} from 'lucide-react';

export const navigationItems = [
  { label: 'Boshqaruv paneli', path: '/mentor/dashboard', icon: LayoutDashboard },
  { label: 'Guruhlar', path: '/mentor/groups', icon: Users },
  { label: "O'quvchilar", path: '/mentor/students', icon: GraduationCap },
  { label: 'Vazifalar', path: '/mentor/tasks', icon: ClipboardList },
  { label: 'Topshirilgan vazifalar', path: '/mentor/submissions', icon: CheckSquare },
  { label: 'Vazifani tekshirish', path: '/mentor/review', icon: ClipboardCheck },
  { label: 'Davomat', path: '/mentor/attendance', icon: CalendarCheck },
  { label: 'Reyting', path: '/mentor/rating', icon: Trophy },
];

export const stats = [
  {
    label: 'Bugungi vazifalar',
    value: '24',
    status: '12%',
    tone: 'blue',
    icon: ClipboardList,
  },
  {
    label: 'Tekshirilishi kerak',
    value: '18',
    status: 'Kutilyapti',
    tone: 'orange',
    icon: ClipboardCheck,
  },
  {
    label: 'Kechikkan vazifalar',
    value: '5',
    status: 'Shoshilinch',
    tone: 'red',
    icon: AlertTriangle,
  },
  {
    label: 'Bugungi darslar',
    value: '3',
    status: 'Guruhlar',
    tone: 'green',
    icon: BookOpen,
  },
];

export const weeklyPerformance = [
  { day: 'Du', activity: 42 },
  { day: 'Se', activity: 68 },
  { day: 'Ch', activity: 87 },
  { day: 'Pa', activity: 46 },
  { day: 'Ju', activity: 72 },
  { day: 'Sh', activity: 24 },
  { day: 'Ya', activity: 11 },
];

export const recentActivities = [
  {
    id: 1,
    initials: 'AK',
    name: 'Azizbek Karimov',
    description: 'JavaScript Asoslari vazifasini yukladi',
    timestamp: '10 daqiqa oldin',
    tone: 'blue',
  },
  {
    id: 2,
    initials: 'MY',
    name: 'Malika Yusupova',
    description: "React Hooks haqida savol so'radi",
    timestamp: '45 daqiqa oldin',
    tone: 'orange',
  },
  {
    id: 3,
    initials: 'SR',
    name: 'Sardor Raxmatov',
    description: '95% natija bilan testni yakunladi',
    timestamp: '2 soat oldin',
    tone: 'green',
  },
  {
    id: 4,
    initials: 'DT',
    name: 'Dilnoza Toshmatova',
    description: 'HTML & CSS Asoslari kursini tugatdi',
    timestamp: '3 soat oldin',
    tone: 'pink',
  },
];

export const upcomingDeadlines = [
  {
    id: 1,
    title: 'HTML/CSS Loyiha',
    course: 'Frontend Guruhi',
    deadline: 'Bugun 23:59',
    tone: 'red',
  },
  {
    id: 2,
    title: 'Python Data Analysis',
    course: 'Backend Guruhi',
    deadline: 'Ertaga 18:00',
    tone: 'orange',
  },
  {
    id: 3,
    title: 'React Final Project',
    course: 'Frontend Pro',
    deadline: '3 kun qoldi',
    tone: 'blue',
  },
];

export function getMentorDashboardData() {
  return {
    navigationItems,
    stats,
    weeklyPerformance,
    recentActivities,
    upcomingDeadlines,
  };
}
