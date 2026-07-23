import {
  LayoutDashboard, Users, GraduationCap, ClipboardList,
  Inbox, ClipboardCheck, CalendarCheck, Trophy,
} from 'lucide-react'

// ─── Navigation ────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Boshqaruv paneli',      Icon: LayoutDashboard, path: '/dashboard' },
  { id: 'groups',      label: 'Guruhlar',               Icon: Users,           path: '/mentor/groups' },
  { id: 'students',    label: "O'quvchilar",            Icon: GraduationCap,   path: '/mentor/students' },
  { id: 'assignments', label: 'Vazifalar',              Icon: ClipboardList,   path: '/mentor/assignments' },
  { id: 'submissions', label: 'Topshirilgan vazifalar', Icon: Inbox,           path: '/topshirilgan' },
  { id: 'review',      label: 'Vazifani tekshirish',   Icon: ClipboardCheck,  path: '/tekshirish' },
  { id: 'attendance',  label: 'Davomat',                Icon: CalendarCheck,   path: '/davomat' },
  { id: 'leaderboard', label: 'Reyting',                Icon: Trophy,          path: '/reyting' },
]

// ─── Overview Numbers ───────────────────────────────────────────────────────
export const OVERVIEW = {
  totalStudents:   150,
  totalGroups:     12,
  totalAssignments: 48,
  pendingReviews:  9,
  attendanceRate:  96,
  completionRate:  74,
}

// ─── Stat Cards ─────────────────────────────────────────────────────────────
export const STATS = [
  {
    id:           'tasks',
    label:        'Bugungi vazifalar',
    value:        48,
    trend:        12,
    trendUp:      true,
    trendLabel:   "o'tgan haftadan",
    iconBg:       'bg-blue-50',
    iconColor:    'text-blue-600',
    numberColor:  'text-slate-900',
    icon:         'ClipboardList',
  },
  {
    id:           'pending',
    label:        'Tekshirilishi kerak',
    value:        9,
    trend:        5,
    trendUp:      false,
    trendLabel:   'kutayotgan',
    iconBg:       'bg-amber-50',
    iconColor:    'text-amber-500',
    numberColor:  'text-slate-900',
    icon:         'Clock',
  },
  {
    id:           'late',
    label:        'Kechikkan vazifalar',
    value:        4,
    trend:        2,
    trendUp:      false,
    trendLabel:   'shoshilinch',
    iconBg:       'bg-red-50',
    iconColor:    'text-red-500',
    numberColor:  'text-red-600',
    icon:         'AlertCircle',
  },
  {
    id:           'lessons',
    label:        'Bugungi darslar',
    value:        3,
    trend:        0,
    trendUp:      true,
    trendLabel:   'aktiv guruhlar',
    iconBg:       'bg-emerald-50',
    iconColor:    'text-emerald-600',
    numberColor:  'text-slate-900',
    icon:         'BookOpen',
  },
]

// ─── Weekly Chart Data ───────────────────────────────────────────────────────
export const WEEKLY_DATA = [
  { day: 'Du', activity: 42, submissions: 8 },
  { day: 'Se', activity: 68, submissions: 14 },
  { day: 'Ch', activity: 87, submissions: 22 },
  { day: 'Pa', activity: 46, submissions: 11 },
  { day: 'Ju', activity: 72, submissions: 18 },
  { day: 'Sh', activity: 24, submissions: 5 },
  { day: 'Ya', activity: 11, submissions: 3 },
]

// ─── Recent Activity ─────────────────────────────────────────────────────────
export const ACTIVITIES = [
  {
    id:       1,
    name:     'Azizbek Karimov',
    action:   'vazifani yukladi',
    subject:  'JavaScript Asoslari',
    time:     '10 daqiqa oldin',
    initials: 'AK',
    color:    'blue',
  },
  {
    id:       2,
    name:     'Malika Yusupova',
    action:   "savol so'radi",
    subject:  'React Hooks haqida',
    time:     '45 daqiqa oldin',
    initials: 'MY',
    color:    'violet',
  },
  {
    id:       3,
    name:     'Sardor Raxmatov',
    action:   'testni yakunladi',
    subject:  '95% natija bilan',
    time:     '2 soat oldin',
    initials: 'SR',
    color:    'emerald',
  },
  {
    id:       4,
    name:     'Dilnoza Toshmatova',
    action:   'kursni tugatdi',
    subject:  'HTML & CSS Asoslari',
    time:     '3 soat oldin',
    initials: 'DT',
    color:    'pink',
  },
  {
    id:       5,
    name:     'Bobur Xasanov',
    action:   "guruhga qo'shildi",
    subject:  'Backend Pro',
    time:     '5 soat oldin',
    initials: 'BX',
    color:    'amber',
  },
  {
    id:       6,
    name:     'Kamola Nazarova',
    action:   'loyihani topshirdi',
    subject:  'Portfolio Website',
    time:     'Kecha, 22:14',
    initials: 'KN',
    color:    'cyan',
  },
]

// ─── Upcoming Deadlines ──────────────────────────────────────────────────────
export const DEADLINES = [
  {
    id:        1,
    title:     'HTML/CSS Loyiha',
    course:    'Frontend Guruhi',
    due:       'Bugun, 23:59',
    priority:  'critical',
    submitted: 18,
    total:     24,
  },
  {
    id:        2,
    title:     'Python Data Analysis',
    course:    'Backend Guruhi',
    due:       'Ertaga, 18:00',
    priority:  'high',
    submitted: 9,
    total:     20,
  },
  {
    id:        3,
    title:     'React Final Project',
    course:    'Frontend Pro',
    due:       '3 kun qoldi',
    priority:  'medium',
    submitted: 5,
    total:     18,
  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  {
    id:      1,
    type:    'submission',
    message: 'Azizbek JavaScript vazifasini topshirdi',
    time:    '10 daqiqa oldin',
    read:    false,
  },
  {
    id:      2,
    type:    'question',
    message: "Malika React Hooks haqida savol yo'lladi",
    time:    '45 daqiqa oldin',
    read:    false,
  },
  {
    id:      3,
    type:    'grade',
    message: "Sardor testda 95 ball to'pladi",
    time:    '2 soat oldin',
    read:    true,
  },
  {
    id:      4,
    type:    'system',
    message: "Yangi guruh: Backend Pro qo'shildi",
    time:    '1 kun oldin',
    read:    true,
  },
]

// ─── Group Progress ──────────────────────────────────────────────────────────
export const GROUPS_PROGRESS = [
  { id: 1, name: 'Frontend Pro',    progress: 91, students: 18, color: 'bg-blue-500' },
  { id: 2, name: 'UI/UX Design',    progress: 83, students: 16, color: 'bg-purple-500' },
  { id: 3, name: 'Frontend Guruhi', progress: 78, students: 24, color: 'bg-indigo-500' },
  { id: 4, name: 'Backend Guruhi',  progress: 62, students: 20, color: 'bg-emerald-500' },
  { id: 5, name: 'Full Stack Dev',  progress: 55, students: 22, color: 'bg-teal-500' },
]

// ─── Recent Messages ─────────────────────────────────────────────────────────
export const MESSAGES = [
  {
    id:      1,
    name:    'Azizbek Karimov',
    preview: "Ustoz, 5-topshiriq haqida savolim bor...",
    time:    '10 daq',
    initials:'AK',
    color:   'blue',
    unread:  true,
  },
  {
    id:      2,
    name:    'Malika Yusupova',
    preview: 'Raxmat, tushundim! Shu qismni qayta ko\'rib...',
    time:    '1 soat',
    initials:'MY',
    color:   'violet',
    unread:  true,
  },
  {
    id:      3,
    name:    'Sardor Raxmatov',
    preview: 'Loyiha tayyor, tekshirib bering)',
    time:    '3 soat',
    initials:'SR',
    color:   'emerald',
    unread:  false,
  },
]
