// Local demo dataset for the Admin "Davomat" management page.
// No backend — every mutation (mark/edit attendance) only updates in-memory state.

export const STATUS_OPTIONS = [
  { value: 'present', label: 'Qatnashdi' },
  { value: 'absent', label: 'Kelmadi' },
  { value: 'late', label: 'Kechikdi' },
  { value: 'excused', label: 'Ruxsatli' },
];

export const COURSE_OPTIONS = ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Mobile Development', 'Data Science'];

export const GROUP_OPTIONS = [
  { code: 'FR-23', course: 'Frontend Development', label: 'FR-23 (Frontend)', mentor: 'Ali Valiyev' },
  { code: 'BK-12', course: 'Backend Development', label: 'BK-12 (Backend)', mentor: 'Sardor Tursunov' },
  { code: 'UX-08', course: 'UI/UX Design', label: 'UX-08 (UI/UX)', mentor: 'Malika Rustamova' },
  { code: 'MB-15', course: 'Mobile Development', label: 'MB-15 (Mobile)', mentor: 'Jasur Sobirov' },
  { code: 'DS-04', course: 'Data Science', label: 'DS-04 (Data Science)', mentor: 'Nodira Qodirova' },
];

export const MENTOR_OPTIONS = ['Ali Valiyev', 'Sardor Tursunov', 'Malika Rustamova', 'Jasur Sobirov', 'Nodira Qodirova'];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const ATTENDANCE_STAT_BASELINE = {
  totalStudents: 1284,
  presentToday: 1196,
  absentToday: 52,
  lateToday: 36,
  avgAttendance: 96,
};

const DAY_MS = 24 * 60 * 60 * 1000;
function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

const WEEKDAY_LABELS = ['Du', 'Se', 'Cho', 'Pay', 'Ju'];

function buildWeeklyHistory(pattern) {
  return WEEKDAY_LABELS.map((day, i) => ({ day, status: pattern[i] }));
}

function buildHistory(seed, monthlyPercent) {
  const cycle = ['present', 'present', 'present', 'present', 'late', 'present', 'absent'];
  return Array.from({ length: 20 }).map((_, i) => {
    const status = cycle[(seed + i) % cycle.length];
    return {
      date: isoDaysAgo(i * 2),
      status,
      comment: status === 'absent' && (seed + i) % 3 === 0 ? "Shifokor ma'lumotnomasi taqdim etilgan." : null,
    };
  });
}

const NAME_POOL = [
  ['Jasur', 'Abdullayev'], ['Malika', 'Karimova'], ['Botir', 'Sobirov'], ['Dilnoza', 'Yusupova'],
  ['Sherzod', 'Rashidov'], ['Nigora', 'Umarova'], ['Aziz', 'Sultonov'], ['Laylo', 'Nazarova'],
  ['Islom', 'Ismoilov'], ['Feruza', 'Xasanova'], ['Davron', 'Toshpulatov'], ['Ozoda', 'Ergasheva'],
  ['Timur', 'Rasulov'], ['Zarnigor', 'Saidova'], ['Elyor', 'Nortojiyev'], ['Shaxzoda', 'Yoqubova'],
  ['Ravshan', 'Bekmuratov'], ['Hulkar', 'Karimova'], ['Anvar', 'Mirzayev'], ['Zilola', 'Rahimova'],
  ['Bekzod', 'Toirov'], ['Gulbahor', 'Saidova'], ['Umid', 'Qodirov'], ['Sitora', 'Tosheva'],
];

const STATUS_CYCLE = ['present', 'present', 'present', 'absent', 'late', 'present'];
const WEEKLY_PATTERNS = [
  ['present', 'present', 'present', 'late', 'present'],
  ['present', 'present', 'none', 'none', 'none'],
  ['present', 'late', 'present', 'present', 'present'],
  ['present', 'present', 'present', 'present', 'absent'],
];

const featuredStudents = [
  {
    id: 'ST-0129',
    firstName: 'Jasur',
    lastName: 'Abdullayev',
    avatarUrl: 'https://i.pravatar.cc/150?u=attend-0129',
    group: GROUP_OPTIONS[0],
    todayStatus: 'present',
    weeklyHistory: buildWeeklyHistory(WEEKLY_PATTERNS[0]),
    monthlyPercent: 95,
    lastAttendedDisplay: 'Bugun, 08:45',
    lastAttendedAt: isoDaysAgo(0),
    parentName: 'Abdullayev oilasi',
    parentPhone: '+998 90 111 22 33',
    history: buildHistory(1, 95),
  },
  {
    id: 'ST-0342',
    firstName: 'Malika',
    lastName: 'Karimova',
    avatarUrl: 'https://i.pravatar.cc/150?u=attend-0342',
    group: GROUP_OPTIONS[1],
    todayStatus: 'absent',
    weeklyHistory: buildWeeklyHistory(WEEKLY_PATTERNS[1]),
    monthlyPercent: 72,
    lastAttendedDisplay: '19 Okt, 2023',
    lastAttendedAt: isoDaysAgo(5),
    parentName: 'Karimova oilasi',
    parentPhone: '+998 93 222 33 44',
    history: buildHistory(2, 72),
  },
  {
    id: 'ST-0411',
    firstName: 'Botir',
    lastName: 'Sobirov',
    avatarUrl: null,
    group: GROUP_OPTIONS[0],
    todayStatus: 'late',
    weeklyHistory: buildWeeklyHistory(WEEKLY_PATTERNS[2]),
    monthlyPercent: 88,
    lastAttendedDisplay: 'Bugun, 09:15',
    lastAttendedAt: isoDaysAgo(0),
    parentName: 'Sobirov oilasi',
    parentPhone: '+998 97 333 44 55',
    history: buildHistory(3, 88),
  },
];

function buildGeneratedStudents() {
  return NAME_POOL.map(([firstName, lastName], index) => {
    const group = GROUP_OPTIONS[index % GROUP_OPTIONS.length];
    const todayStatus = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const monthlyPercent = 60 + ((index * 7) % 40);

    return {
      id: `ST-${1500 + index}`,
      firstName,
      lastName,
      avatarUrl: index % 4 === 0 ? null : `https://i.pravatar.cc/150?u=attend-${1500 + index}`,
      group,
      todayStatus,
      weeklyHistory: buildWeeklyHistory(WEEKLY_PATTERNS[index % WEEKLY_PATTERNS.length]),
      monthlyPercent,
      lastAttendedDisplay: index % 3 === 0 ? `Bugun, ${8 + (index % 4)}:${10 + (index % 5) * 10}` : `${10 + (index % 18)} Okt, 2023`,
      lastAttendedAt: isoDaysAgo(index % 10),
      parentName: `${lastName} oilasi`,
      parentPhone: `+998 9${index % 10} ${400 + index} ${10 + (index % 80)} ${20 + (index % 70)}`,
      history: buildHistory(10 + index, monthlyPercent),
    };
  });
}

export const mockAttendanceStudents = [...featuredStudents, ...buildGeneratedStudents()];
