// Local demo dataset for the Admin "Guruhlar" management page.
// No backend — every mutation (create/edit/archive/delete) only updates in-memory state.

export const COURSE_OPTIONS = [
  'Frontend Development',
  'ReactJS Development',
  'Python/Django',
  'UI/UX Design',
  'Backend (Node.js)',
  'Mobile Development',
];

export const MENTOR_OPTIONS = [
  { name: 'Alisher Vahobov', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-0' },
  { name: 'Jahongir Qosimov', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-1' },
  { name: 'Malika Rahmatova', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-2' },
  { name: 'Rustam Aliyev', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-3' },
  { name: 'Sevara Ahmedova', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-4' },
  { name: 'Bekzod Toirov', avatarUrl: 'https://i.pravatar.cc/150?u=gmentor-5' },
];

export const STUDENT_STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'warned', label: 'Ogohlantirilgan' },
  { value: 'graduated', label: 'Bitirgan' },
];

export const WEEKDAYS = [
  { id: 'Dushanba', label: 'Dushanba' },
  { id: 'Seshanba', label: 'Seshanba' },
  { id: 'Chorshanba', label: 'Chorshanba' },
  { id: 'Payshanba', label: 'Payshanba' },
  { id: 'Juma', label: 'Juma' },
  { id: 'Shanba', label: 'Shanba' },
  { id: 'Yakshanba', label: 'Yakshanba' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'oldest', label: 'Eng eski' },
  { value: 'progress', label: 'Progress bo\'yicha' },
];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const GROUP_STAT_BASELINE = {
  total: 36,
  active: 32,
  totalStudents: 1284,
  totalMentors: 48,
  todayLessons: 18,
};

const DAY_MS = 24 * 60 * 60 * 1000;
function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}
function isoDaysAhead(days) {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

const STUDENT_STATUS_CYCLE = ['active', 'active', 'active', 'warned', 'active', 'graduated'];
const FIRST_NAME_POOL = ['Sardor', 'Malika', 'Ibrohim', 'Dilnoza', 'Jasur', 'Nodira', 'Aziz', 'Kamola'];
const LAST_NAME_POOL = ['Abdullayev', 'Karimova', 'Toshmatov', 'Yusupova', 'Rahimov', 'Saidova', 'Nortojiyev', 'Ergasheva'];

function buildStudents(count, seed) {
  return Array.from({ length: count }).map((_, i) => {
    const firstName = FIRST_NAME_POOL[(seed + i) % FIRST_NAME_POOL.length];
    const lastName = LAST_NAME_POOL[(seed + i * 3) % LAST_NAME_POOL.length];
    return {
      id: String(seed * 100 + i + 1).padStart(3, '0'),
      name: `${firstName} ${lastName}`,
      avatarUrl: `https://i.pravatar.cc/150?u=gstudent-${seed}-${i}`,
      phone: `+998 9${i % 10} ${100 + seed} ${10 + (i % 80)} ${20 + (i % 70)}`,
      attendance: 70 + ((seed + i * 5) % 30),
      score: 60 + ((seed + i * 7) % 40),
      status: STUDENT_STATUS_CYCLE[(seed + i) % STUDENT_STATUS_CYCLE.length],
      parentName: `${lastName} oilasi`,
      parentPhone: `+998 9${(i + 1) % 10} ${200 + seed} ${10 + (i % 60)} ${30 + (i % 50)}`,
    };
  });
}

function buildAssignments(count, seed, studentCount) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `A-${seed}-${i + 1}`,
    title: `Vazifa #${i + 1}`,
    dueDate: isoDaysAhead(i * 7 - 14),
    submittedCount: Math.max(0, studentCount - ((seed + i) % Math.max(1, studentCount))),
    totalCount: studentCount,
  }));
}

function buildAttendanceHistory(weeks, seed) {
  return Array.from({ length: weeks }).map((_, i) => ({
    date: isoDaysAgo(i * 7),
    presentCount: 10 + ((seed + i * 3) % 10),
    totalCount: 20,
  }));
}

const featuredGroups = [
  {
    id: 'GRP-2401',
    name: 'Frontend N-24',
    course: 'Frontend Development',
    status: 'active',
    mentor: MENTOR_OPTIONS[0],
    startDate: isoDaysAgo(90),
    endDate: isoDaysAhead(90),
    scheduleDays: ['Du', 'Cho', 'Ju'],
    scheduleTime: '14:00 - 16:00',
    room: 'N-3 Xona',
    capacity: 26,
    studentCount: 24,
    avgScore: 88,
    attendance: 94,
    lessonsCompleted: 16,
    lessonsTotal: 24,
    progressPercent: 72,
    students: buildStudents(24, 1),
    assignments: buildAssignments(8, 1, 24),
    attendanceHistory: buildAttendanceHistory(8, 1),
    totalAssignments: 156,
    createdAt: isoDaysAgo(300),
  },
  {
    id: 'GRP-2402',
    name: 'React N-12',
    course: 'ReactJS Development',
    status: 'active',
    mentor: MENTOR_OPTIONS[2],
    startDate: isoDaysAgo(60),
    endDate: isoDaysAhead(120),
    scheduleDays: ['Se', 'Pay', 'Sha'],
    scheduleTime: '16:00 - 18:00',
    room: 'B-110',
    capacity: 18,
    studentCount: 15,
    avgScore: 88,
    attendance: 92,
    lessonsCompleted: 11,
    lessonsTotal: 24,
    progressPercent: 45,
    students: buildStudents(15, 2),
    assignments: buildAssignments(6, 2, 15),
    attendanceHistory: buildAttendanceHistory(6, 2),
    totalAssignments: 88,
    createdAt: isoDaysAgo(200),
  },
  {
    id: 'GRP-2403',
    name: 'Backend B-04',
    course: 'Python/Django',
    status: 'active',
    mentor: MENTOR_OPTIONS[3],
    startDate: isoDaysAgo(150),
    endDate: isoDaysAhead(30),
    scheduleDays: ['Du', 'Cho', 'Ju'],
    scheduleTime: '18:30 - 20:30',
    room: 'C-301',
    capacity: 15,
    studentCount: 12,
    avgScore: 94,
    attendance: 98,
    lessonsCompleted: 20,
    lessonsTotal: 24,
    progressPercent: 85,
    students: buildStudents(12, 3),
    assignments: buildAssignments(10, 3, 12),
    attendanceHistory: buildAttendanceHistory(10, 3),
    totalAssignments: 112,
    createdAt: isoDaysAgo(420),
  },
];

const GROUP_NAME_POOL = [
  'UI/UX D-05', 'Mobile M-02', 'Backend B-07', 'Frontend N-31', 'React N-19',
  'Python P-08', 'Design D-11', 'Node N-03', 'Mobile M-06', 'Frontend N-40',
  'React N-22', 'Python P-14',
];

const STATUS_CYCLE = ['active', 'active', 'inactive', 'active', 'active', 'archived'];

function buildGeneratedGroups() {
  return GROUP_NAME_POOL.map((name, index) => {
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const course = COURSE_OPTIONS[index % COURSE_OPTIONS.length];
    const mentor = MENTOR_OPTIONS[index % MENTOR_OPTIONS.length];
    const lessonsCompleted = 4 + ((index * 3) % 20);
    const studentCount = 8 + (index % 15);

    return {
      id: `GRP-${2500 + index}`,
      name,
      course,
      status,
      mentor,
      startDate: isoDaysAgo(30 + index * 10),
      endDate: isoDaysAhead(60 + index * 5),
      scheduleDays: index % 2 === 0 ? ['Du', 'Cho', 'Ju'] : ['Se', 'Pay', 'Sha'],
      scheduleTime: index % 2 === 0 ? '10:00 - 12:00' : '15:00 - 17:00',
      room: `${String.fromCharCode(65 + (index % 5))}-${100 + index}`,
      capacity: 20,
      studentCount,
      avgScore: 60 + ((index * 6) % 40),
      attendance: 70 + ((index * 4) % 30),
      lessonsCompleted,
      lessonsTotal: 24,
      progressPercent: Math.round((lessonsCompleted / 24) * 100),
      students: buildStudents(studentCount, 10 + index),
      assignments: buildAssignments(5 + (index % 5), 10 + index, studentCount),
      attendanceHistory: buildAttendanceHistory(6, 10 + index),
      totalAssignments: 40 + index * 6,
      createdAt: isoDaysAgo(30 + index * 8),
    };
  });
}

export const mockGroups = [...featuredGroups, ...buildGeneratedGroups()];
