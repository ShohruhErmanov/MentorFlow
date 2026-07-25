// ─── Attendance Stats ────────────────────────────────────────────────────────
export const attendanceStats = [
  {
    id: 'overall',
    label: 'Umumiy Davomat',
    value: '92%',
    trend: '+2%',
    trendUp: true,
    tone: 'blue',
  },
  {
    id: 'present',
    label: "Kelganlar (O'rtacha)",
    value: '22',
    extra: '/ 24',
    tone: 'blue',
  },
  {
    id: 'absent',
    label: 'Qatnashmaganlar',
    value: '1.5',
    extra: 'talaba',
    tone: 'red',
  },
  {
    id: 'late',
    label: 'Kechikkanlar',
    value: '0.5',
    extra: 'talaba',
    tone: 'orange',
  },
];

// ─── Calendar Data (October 2025) ────────────────────────────────────────────
// status: 'present' | 'late' | 'absent' | null
export const calendarDays = [
  // Week 1 (Oct starts on Wednesday)
  { day: null }, { day: null }, { day: 1, status: 'present' },
  { day: 2, status: 'present' }, { day: 3, status: 'late' },
  { day: 4, status: null }, { day: 5, status: null },
  // Week 2
  { day: 6, status: null },
  { day: 7, status: 'present' }, { day: 8, status: 'present' },
  { day: 9, status: 'present' }, { day: 10, status: 'late' },
  { day: 11, status: 'absent' }, { day: 12, status: null },
  // Week 3
  { day: 13, status: null },
  { day: 14, status: 'present' }, { day: 15, status: 'present' },
  { day: 16, status: 'present' }, { day: 17, status: 'present' },
  { day: 18, status: null }, { day: 19, status: null },
  // Week 4
  { day: 20, status: null },
  { day: 21, status: 'present' }, { day: 22, status: 'present' },
  { day: 23, status: 'late' }, { day: 24, status: 'present' },
  { day: 25, status: null }, { day: 26, status: null },
  // Week 5
  { day: 27, status: null },
  { day: 28, status: 'present' }, { day: 29, status: 'present' },
  { day: 30, status: 'present' }, { day: 31, status: 'present' },
  { day: null }, { day: null },
];

export const calendarWeekDays = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];

// ─── Today's Lesson ──────────────────────────────────────────────────────────
export const todayLesson = {
  date: '7-Oktabr, Dushanba',
  course: 'Front-End Asoslari',
  group: 'Frontend Guruhi (G9-12)',
};

// ─── Group Options ───────────────────────────────────────────────────────────
export const groupOptions = [
  'Frontend Guruhi (G9-12)',
  'Backend Guruhi (G7-10)',
  'Full Stack (G5-8)',
  'UI/UX Design (G3-6)',
];

// ─── Month Options ───────────────────────────────────────────────────────────
export const monthOptions = [
  'Sentyabr, 2025',
  'Oktabr, 2025',
  'Noyabr, 2025',
  'Dekabr, 2025',
];

// ─── Students ────────────────────────────────────────────────────────────────
export const attendanceStudents = [
  {
    id: 1,
    name: 'Azizbek Abdullayev',
    avatar: 'https://i.pravatar.cc/150?u=azizbek',
    initials: 'AA',
    date: '07.10.2025, 14:00',
    status: 'present',
    comment: '-',
  },
  {
    id: 2,
    name: 'Malika Karimova',
    avatar: 'https://i.pravatar.cc/150?u=malika',
    initials: 'MK',
    date: '07.10.2025, 14:15',
    status: 'late',
    comment: 'Tirbandlik sababli',
  },
  {
    id: 3,
    name: 'Sardor Rahimov',
    avatar: '',
    initials: 'SR',
    date: '-',
    status: 'absent',
    comment: "Sog'ligi yuzasidan",
  },
  {
    id: 4,
    name: "Madina To'rayeva",
    avatar: 'https://i.pravatar.cc/150?u=madina',
    initials: 'MT',
    date: '07.10.2025, 13:55',
    status: 'present',
    comment: '-',
  },
  {
    id: 5,
    name: 'Jamshid Karimov',
    avatar: 'https://i.pravatar.cc/150?u=jamshid',
    initials: 'JK',
    date: '07.10.2025, 14:02',
    status: 'present',
    comment: '-',
  },
  {
    id: 6,
    name: 'Nilufar Ergasheva',
    avatar: 'https://i.pravatar.cc/150?u=nilufar',
    initials: 'NE',
    date: '-',
    status: 'vacation',
    comment: "Ta'tilda",
  },
  {
    id: 7,
    name: 'Bobur Xasanov',
    avatar: 'https://i.pravatar.cc/150?u=bobur',
    initials: 'BX',
    date: '07.10.2025, 14:00',
    status: 'present',
    comment: '-',
  },
  {
    id: 8,
    name: 'Dilnoza Toshmatova',
    avatar: 'https://i.pravatar.cc/150?u=dilnoza',
    initials: 'DT',
    date: '07.10.2025, 14:20',
    status: 'late',
    comment: 'Transport muammosi',
  },
  {
    id: 9,
    name: 'Otabek Nazarov',
    avatar: '',
    initials: 'ON',
    date: '07.10.2025, 14:00',
    status: 'present',
    comment: '-',
  },
  {
    id: 10,
    name: 'Kamola Nazarova',
    avatar: 'https://i.pravatar.cc/150?u=kamola-n',
    initials: 'KN',
    date: '07.10.2025, 14:05',
    status: 'present',
    comment: '-',
  },
];
