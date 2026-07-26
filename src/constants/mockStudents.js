// Local demo dataset for the Admin "O'quvchilar" management page.
// No backend — every mutation (create/edit/attendance/payment/block/delete) only updates in-memory state.

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Erkak' },
  { value: 'female', label: 'Ayol' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
  { value: 'graduated', label: 'Bitirgan' },
  { value: 'blocked', label: 'Bloklangan' },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: 'paid', label: "To'langan" },
  { value: 'debt', label: 'Qarz' },
  { value: 'pending', label: 'Kutilmoqda' },
];

export const GROUP_OPTIONS = ['Frontend #12', 'UI/UX Design', 'Python #4', 'Backend #7', 'Mobile #3', 'Data #5'];

export const MENTOR_OPTIONS = ['Javohir E.', 'Lola K.', 'Sardor I.', 'Malika Y.', 'Aziz R.'];

export const ATTENDANCE_STATUS_OPTIONS = [
  { value: 'present', label: 'Keldi' },
  { value: 'absent', label: 'Kelmadi' },
  { value: 'late', label: 'Kechikdi' },
];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const STUDENT_STAT_BASELINE = {
  total: 1248,
  avgRating: 4.8,
  attendanceRate: 88.5,
  monthlyRevenue: 42.5, // in millions (UZS)
};

const DAY_MS = 24 * 60 * 60 * 1000;
function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

function buildAttendanceHistory(baseAttendance, seed) {
  const statuses = ['present', 'present', 'present', 'late', 'absent'];
  return Array.from({ length: 6 }).map((_, i) => ({
    date: isoDaysAgo(i * 7 + seed),
    status: statuses[(seed + i) % statuses.length],
  }));
}

function buildPayments(amountPerMonth, seed) {
  return Array.from({ length: 3 }).map((_, i) => ({
    id: `PMT-${seed}${i}`,
    date: isoDaysAgo(30 * i + seed),
    amount: amountPerMonth,
    method: i % 2 === 0 ? 'Naqd' : "Bank o'tkazmasi",
    status: 'paid',
  }));
}

const featuredStudents = [
  {
    id: 'ST-4521',
    firstName: 'Madina',
    lastName: 'Akramova',
    username: 'madina.a',
    email: 'madina.a@mentorflow.uz',
    phone: '+998 90 123 45 67',
    birthDate: '2007-03-14',
    gender: 'female',
    mentorName: 'Javohir E.',
    group: 'Frontend #12',
    parentName: 'Alisher Akramov',
    avatarUrl: 'https://i.pravatar.cc/150?u=student-4521',
    status: 'active',
    paymentStatus: 'paid',
    balance: 0,
    attendance: 94,
    rating: 982,
    attendanceHistory: buildAttendanceHistory(94, 1),
    payments: buildPayments(1200000, 1),
    assignments: { completed: 18, total: 20 },
    createdAt: isoDaysAgo(260),
  },
  {
    id: 'ST-4522',
    firstName: 'Sardor',
    lastName: 'Rahmonov',
    username: 'sardor.r',
    email: 'sardor.r@mentorflow.uz',
    phone: '+998 93 987 65 43',
    birthDate: '2006-11-02',
    gender: 'male',
    mentorName: 'Lola K.',
    group: 'UI/UX Design',
    parentName: 'Gulnora Rahmonova',
    avatarUrl: 'https://i.pravatar.cc/150?u=student-4522',
    status: 'active',
    paymentStatus: 'debt',
    balance: 450000,
    attendance: 65,
    rating: 450,
    attendanceHistory: buildAttendanceHistory(65, 2),
    payments: buildPayments(950000, 2),
    assignments: { completed: 9, total: 20 },
    createdAt: isoDaysAgo(340),
  },
  {
    id: 'ST-4523',
    firstName: 'Otabek',
    lastName: "Yo'ldoshev",
    username: 'otabek.y',
    email: 'otabek.y@mentorflow.uz',
    phone: '+998 97 111 22 33',
    birthDate: '2007-06-21',
    gender: 'male',
    mentorName: 'Sardor I.',
    group: 'Python #4',
    parentName: 'Zebo Yo\'ldosheva',
    avatarUrl: 'https://i.pravatar.cc/150?u=student-4523',
    status: 'active',
    paymentStatus: 'pending',
    balance: 600000,
    attendance: 88,
    rating: 812,
    attendanceHistory: buildAttendanceHistory(88, 3),
    payments: buildPayments(1100000, 3),
    assignments: { completed: 14, total: 20 },
    createdAt: isoDaysAgo(180),
  },
];

const NAME_POOL = [
  ['Diyora', 'Saidova'],
  ['Jasurbek', 'Nematov'],
  ['Sitora', 'Yusupova'],
  ['Umid', 'Qodirov'],
  ['Feruza', 'Nazarova'],
  ['Islomjon', 'Sultonov'],
  ['Malika', 'Tosheva'],
  ['Davron', 'Ismoilov'],
  ['Ozoda', 'Xasanova'],
  ['Temur', 'Yusupov'],
  ['Nilufar', 'Abdurahmonova'],
  ['Sherzod', 'Mirzayev'],
  ['Gulbahor', 'Ergasheva'],
  ['Anvar', 'Toshpulatov'],
  ['Zilola', 'Karimova'],
  ['Bobur', 'Saidov'],
  ['Hulkar', 'Nortojiyeva'],
  ['Ravshan', 'Bekmuratov'],
  ['Shaxzoda', 'Yoqubova'],
  ['Elyor', 'Rashidov'],
  ['Zarnigor', 'Umarova'],
];

const STATUS_CYCLE = ['active', 'active', 'active', 'inactive', 'active', 'graduated', 'active', 'blocked'];
const PAYMENT_CYCLE = ['paid', 'paid', 'debt', 'pending', 'paid', 'debt', 'paid', 'pending'];

function buildGeneratedStudents() {
  return NAME_POOL.map(([firstName, lastName], index) => {
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const paymentStatus = PAYMENT_CYCLE[index % PAYMENT_CYCLE.length];
    const group = GROUP_OPTIONS[index % GROUP_OPTIONS.length];
    const mentorName = MENTOR_OPTIONS[index % MENTOR_OPTIONS.length];
    const attendance = 60 + ((index * 7) % 38);
    const rating = 300 + ((index * 53) % 700);
    const balance = paymentStatus === 'paid' ? 0 : 350000 + index * 15000;
    const username = `${firstName}.${lastName}`.toLowerCase();

    return {
      id: `ST-${4600 + index}`,
      firstName,
      lastName,
      username,
      email: `${username}@mentorflow.uz`,
      phone: `+998 9${index % 10} ${200 + index * 3} ${10 + (index % 80)} ${20 + (index % 70)}`,
      birthDate: `${2005 + (index % 5)}-0${1 + (index % 9)}-1${index % 9}`,
      gender: index % 2 === 0 ? 'male' : 'female',
      mentorName,
      group,
      parentName: `${lastName} oilasi`,
      avatarUrl: `https://i.pravatar.cc/150?u=student-${4600 + index}`,
      status,
      paymentStatus,
      balance,
      attendance,
      rating,
      attendanceHistory: buildAttendanceHistory(attendance, index),
      payments: buildPayments(900000 + index * 10000, index),
      assignments: { completed: 5 + (index % 15), total: 20 },
      createdAt: isoDaysAgo(90 + index * 9),
    };
  });
}

export const mockStudents = [...featuredStudents, ...buildGeneratedStudents()];
