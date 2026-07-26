// Local demo dataset for the Admin "Kurslar" management page.
// No backend — every mutation (create/edit/archive/delete) only updates in-memory state.

export const CATEGORY_OPTIONS = ['Frontend', 'Dizayn', 'Backend', 'Mobile', 'Data Science', 'Marketing'];

export const MENTOR_OPTIONS = [
  { name: 'Ali Valiyev', position: 'Katta Mentor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-1' },
  { name: 'Malika Rustamova', position: 'Art Direktor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-2' },
  { name: 'Jasur Sobirov', position: 'Senior Engineer', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-3' },
  { name: 'Nodira Qodirova', position: 'Mentor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-4' },
  { name: 'Bekzod Toirov', position: 'Lead Mentor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-5' },
];

export const DURATION_OPTIONS = ['3 oy', '4 oy', '6 oy', '8 oy', '12 oy'];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'upcoming', label: 'Tez kunda' },
  { value: 'inactive', label: 'Nofaol' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'oldest', label: 'Eng eski' },
  { value: 'progress', label: "Progress bo'yicha" },
  { value: 'students', label: "O'quvchilar soni bo'yicha" },
];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const COURSE_STAT_BASELINE = {
  total: 18,
  active: 15,
  totalStudents: 1284,
  totalMentors: 48,
  endingSoon: 3,
};

const DAY_MS = 24 * 60 * 60 * 1000;
function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}
function isoDaysAhead(days) {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

function buildLessons(count, seed) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `L-${seed}-${i + 1}`,
    title: `${i + 1}-dars: Mavzu ${i + 1}`,
    durationMinutes: 60 + ((seed + i * 5) % 60),
    completed: i < Math.round(count * 0.6),
  }));
}

function buildAssignments(count, seed, studentCount) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `CA-${seed}-${i + 1}`,
    title: `Amaliy topshiriq #${i + 1}`,
    dueDate: isoDaysAhead(i * 10 - 20),
    submittedCount: Math.max(0, studentCount - ((seed + i) % Math.max(1, studentCount))),
    totalCount: studentCount,
  }));
}

const STUDENT_FIRST_NAMES = ['Sardor', 'Malika', 'Ibrohim', 'Dilnoza', 'Jasur', 'Nodira', 'Aziz', 'Kamola'];
const STUDENT_LAST_NAMES = ['Abdullayev', 'Karimova', 'Toshmatov', 'Yusupova', 'Rahimov', 'Saidova', 'Nortojiyev', 'Ergasheva'];

function buildCourseStudents(studentCount, seed) {
  const sampleSize = Math.min(studentCount, 12);
  return Array.from({ length: sampleSize }).map((_, i) => ({
    id: String(seed * 100 + i + 1).padStart(3, '0'),
    name: `${STUDENT_FIRST_NAMES[(seed + i) % STUDENT_FIRST_NAMES.length]} ${STUDENT_LAST_NAMES[(seed + i * 3) % STUDENT_LAST_NAMES.length]}`,
    avatarUrl: `https://i.pravatar.cc/150?u=cstudent-${seed}-${i}`,
    progress: 30 + ((seed + i * 6) % 65),
  }));
}

const featuredCourses = [
  {
    id: 'CRS-101',
    name: 'Frontend Development',
    category: 'Frontend',
    shortDescription: "Zamonaviy web ilovalar yaratish uchun HTML, CSS, JavaScript va React asoslari.",
    fullDescription:
      "Ushbu kurs davomida siz HTML, CSS va JavaScript asoslaridan boshlab, React yordamida zamonaviy, responsiv web ilovalar yaratishni o'rganasiz. Kurs amaliy loyihalar orqali olib boriladi.",
    duration: '6 oy',
    price: 1800000,
    mentor: { name: 'Ali Valiyev', position: 'Katta Mentor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-1' },
    coverImageUrl: 'https://picsum.photos/seed/mf-course-frontend/640/360',
    studentCount: 124,
    progressPercent: 85,
    status: 'active',
    groups: ['FN-24', 'FN-11'],
    lessons: buildLessons(24, 1),
    assignments: buildAssignments(8, 1, 124),
    students: buildCourseStudents(124, 1),
    createdAt: isoDaysAgo(300),
  },
  {
    id: 'CRS-102',
    name: 'UI/UX Design Masterclass',
    category: 'Dizayn',
    shortDescription: "Figma dasturida ishlash, foydalanuvchi tajribasini tadqiq qilish va zamonaviy interfeys dizayni.",
    fullDescription:
      "Kurs davomida Figma dasturida professional darajada ishlashni, foydalanuvchi tadqiqotlarini o'tkazishni va zamonaviy, chiroyli interfeyslar yaratishni o'rganasiz.",
    duration: '4 oy',
    price: 1400000,
    mentor: { name: 'Malika Rustamova', position: 'Art Direktor', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-2' },
    coverImageUrl: 'https://picsum.photos/seed/mf-course-uiux/640/360',
    studentCount: 86,
    progressPercent: 62,
    status: 'active',
    groups: ['UXD-24'],
    lessons: buildLessons(18, 2),
    assignments: buildAssignments(6, 2, 86),
    students: buildCourseStudents(86, 2),
    createdAt: isoDaysAgo(200),
  },
  {
    id: 'CRS-103',
    name: 'Python Backend...',
    category: 'Backend',
    shortDescription: "Django va FastAPI yordamida mustahkam va kengayuvchan backend tizimlar qurish.",
    fullDescription:
      "Ushbu kursda Python tilida Django va FastAPI freymvorklari yordamida ishonchli, xavfsiz va kengaytiriladigan backend tizimlarni qanday qurishni o'rganasiz.",
    duration: '8 oy',
    price: 2200000,
    mentor: { name: 'Jasur Sobirov', position: 'Senior Engineer', avatarUrl: 'https://i.pravatar.cc/150?u=cmentor-3' },
    coverImageUrl: 'https://picsum.photos/seed/mf-course-python/640/360',
    studentCount: 0,
    progressPercent: 0,
    status: 'upcoming',
    groups: [],
    lessons: buildLessons(28, 3),
    assignments: buildAssignments(10, 3, 0),
    students: buildCourseStudents(0, 3),
    createdAt: isoDaysAgo(20),
  },
];

const COURSE_NAME_POOL = [
  'Mobile App Development', 'Data Science Fundamentals', 'Digital Marketing', 'Node.js Backend',
  'Flutter Mobile', 'Graphic Design', 'SQL & Databases', 'DevOps Asoslari', 'SEO Marketing',
  'Vue.js Development', 'Machine Learning', 'Content Marketing', 'Java Backend', 'Illustration Design',
  'Cyber Security',
];

const STATUS_CYCLE = ['active', 'active', 'inactive', 'active', 'upcoming', 'active'];

function buildGeneratedCourses() {
  return COURSE_NAME_POOL.map((name, index) => {
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const category = CATEGORY_OPTIONS[index % CATEGORY_OPTIONS.length];
    const mentor = MENTOR_OPTIONS[index % MENTOR_OPTIONS.length];
    const duration = DURATION_OPTIONS[index % DURATION_OPTIONS.length];
    const studentCount = status === 'upcoming' ? 0 : 20 + (index % 15) * 5;

    return {
      id: `CRS-${200 + index}`,
      name,
      category,
      shortDescription: `${name} bo'yicha amaliy va nazariy bilimlarni o'zida mujassam etgan kurs.`,
      fullDescription: `${name} kursi orqali sohaning asosiy va ilg'or mavzularini chuqur o'rganasiz. Kurs amaliy mashg'ulotlar bilan boyitilgan.`,
      duration,
      price: 900000 + index * 60000,
      mentor,
      coverImageUrl: `https://picsum.photos/seed/mf-course-${index}/640/360`,
      studentCount,
      progressPercent: status === 'upcoming' ? 0 : 20 + ((index * 9) % 75),
      status,
      groups: status === 'upcoming' ? [] : [`GRP-${300 + index}`],
      lessons: buildLessons(12 + (index % 12), 10 + index),
      assignments: buildAssignments(4 + (index % 6), 10 + index, studentCount),
      students: buildCourseStudents(studentCount, 10 + index),
      createdAt: isoDaysAgo(20 + index * 12),
    };
  });
}

export const mockCourses = [...featuredCourses, ...buildGeneratedCourses()];
