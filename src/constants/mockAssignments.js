// Local demo dataset for the Admin "Vazifalar" management page.
// No backend — every mutation (create/edit/extend/archive/delete) only updates in-memory state.
// Submission-level records live separately in mockSubmissions.js.

export const CATEGORY_OPTIONS = ['UI/UX Dizayn', 'Frontend Dev', 'Backend', 'Mobile', 'Data Science'];

export const COURSE_OPTIONS = [
  'Frontend Development',
  'UI/UX Design Masterclass',
  'Python Backend',
  'Mobile App Development',
  'Data Science Fundamentals',
  'Full-stack Web Development',
];

export const GROUP_OPTIONS = ['Group #101', 'Group #102', 'Group #103', 'Group #104', 'Group #105', 'G-42 Premium'];

export const MENTOR_OPTIONS = [
  { name: 'Javohir Orinjov', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-1' },
  { name: 'Malika Kamronova', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-2' },
  { name: 'Azizbek Nazarov', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-3' },
  { name: 'Akbar Sultanov', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-4' },
  { name: 'Nodira Qodirova', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-5' },
  { name: 'Sardor Muxtorov', avatarUrl: 'https://i.pravatar.cc/150?u=amentor-6' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'submitted', label: 'Topshirilgan' },
  { value: 'overdue', label: 'Kechikkan' },
  { value: 'reviewing', label: 'Tekshirilmoqda' },
  { value: 'archived', label: 'Arxivlangan' },
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'oldest', label: 'Eng eski' },
  { value: 'deadline', label: 'Muddat bo\'yicha' },
  { value: 'progress', label: "Progress bo'yicha" },
];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const ASSIGNMENT_STAT_BASELINE = {
  total: 248,
  active: 126,
  submitted: 184,
  overdue: 22,
  reviewing: 42,
};

const DAY_MS = 24 * 60 * 60 * 1000;
export function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}
export function isoDaysAhead(days) {
  return new Date(Date.now() + days * DAY_MS).toISOString();
}

function buildAttachments(seed) {
  return {
    pdf: { name: 'vazifa_toliq_shartlari.pdf', url: '#', sizeLabel: '1.4 MB' },
    video: { name: 'dars_videosi.mp4', url: '#', sizeLabel: '42 MB' },
    github: { name: 'GitHub Template', url: 'https://github.com/mentorflow/template-' + seed, sizeLabel: 'Link' },
    figma: null,
  };
}

const featuredAssignments = [
  {
    id: 'ASG-9001',
    title: "E-Commerce Full-stack Ilova: Backend Integratsiyasi",
    category: 'Full-stack',
    course: 'Full-stack Web Development',
    group: 'G-42 Premium',
    shortDescription: "Full-stack ilova: Laravel va React integratsiyasi.",
    fullDescription:
      "Ushbu vazifada siz o'tgan darslarda o'rganilgan Laravel va React integratsiyasini to'liq amaliyotda qo'llashingiz kerak. Ilova asosiy funksionalligi foydalanuvchilarga tovarlarni ko'rish, savatga qo'shish va buyurtma berish imkonini berishi lozim.",
    requirements: [
      'Laravel 10+ REST API interfeysini qurish.',
      "React (Vite) yordamida zamonaviy interfeys yaratish.",
      "JWT orqali Autentifikatsiya (Login/Register).",
      "Redux Toolkit yordamida state managementni boshqarish.",
      'Responsive dizayn (Tailwind CSS).',
    ],
    technologies: ['React', 'Laravel', 'Redux Toolkit', 'Tailwind CSS', 'MySQL'],
    mentor: MENTOR_OPTIONS[5],
    maxScore: 100,
    deadline: '2024-06-24T00:00:00.000Z',
    status: 'active',
    attachments: buildAttachments(1),
    note: "Vazifani topshirishda albatta \"README.md\" fayliga loyihani ishga tushirish qoidalarini yozishni unutmang. Bu tekshirish jarayonini tezlashtiradi.",
    createdAt: '2024-05-12T00:00:00.000Z',
  },
  {
    id: 'ASG-9002',
    title: 'React State Management with Redux',
    category: 'Frontend Dev',
    course: 'Frontend Development',
    group: 'Group #102',
    shortDescription: "Redux Toolkit yordamida global state boshqaruvini amalga oshiring. API...",
    fullDescription:
      "Redux Toolkit yordamida global state boshqaruvini amalga oshiring. API bilan integratsiya qiling va async holatlarni to'g'ri boshqarishni o'rganing.",
    requirements: [
      'createSlice va createAsyncThunk ishlatilishi shart.',
      "Loading/error holatlari to'g'ri boshqarilishi kerak.",
    ],
    technologies: ['React', 'Redux Toolkit', 'TypeScript'],
    mentor: MENTOR_OPTIONS[1],
    maxScore: 80,
    deadline: isoDaysAgo(0),
    status: 'overdue',
    attachments: buildAttachments(2),
    note: "Topshirishdan oldin barcha testlar (npm test) muvaffaqiyatli o'tganiga ishonch hosil qiling.",
    createdAt: isoDaysAgo(15),
  },
  {
    id: 'ASG-9003',
    title: 'Django Rest Framework Integration',
    category: 'Backend',
    course: 'Python Backend',
    group: 'Group #101',
    shortDescription: "Mavjud model asosida CRUD operatsiyalari uchun API...",
    fullDescription:
      "Mavjud Django modeli asosida to'liq CRUD operatsiyalarini bajaruvchi REST API yarating. Autentifikatsiya va ruxsatlarni to'g'ri sozlang.",
    requirements: [
      'JWT autentifikatsiya qo\'llanilishi shart.',
      "Serializerlar to'g'ri validatsiyaga ega bo'lishi kerak.",
      'Testlar (pytest) bilan qamrab olinishi kerak.',
    ],
    technologies: ['Django', 'DRF', 'PostgreSQL', 'pytest'],
    mentor: MENTOR_OPTIONS[2],
    maxScore: 150,
    deadline: isoDaysAhead(30),
    status: 'reviewing',
    attachments: buildAttachments(3),
    note: "API hujjatlari Swagger yoki Postman kolleksiyasi ko'rinishida biriktirilishi tavsiya etiladi.",
    createdAt: isoDaysAgo(10),
  },
  {
    id: 'ASG-9004',
    title: 'Introduction to Algorithms',
    category: 'Data Science',
    group: 'Group #101',
    course: 'Data Science Fundamentals',
    shortDescription: "Saralash (sorting) algoritmlari va ularning samaradorligini tahlil qilish.",
    fullDescription:
      "Saralash algoritmlarini (bubble, quick, merge sort) amalga oshiring va ularning vaqt murakkabligini solishtiring.",
    requirements: ['Har bir algoritm uchun Big-O tahlili taqdim etilishi kerak.', "Taqqoslash jadvali qo'shilishi shart."],
    technologies: ['Python', 'Jupyter'],
    mentor: MENTOR_OPTIONS[3],
    maxScore: 60,
    deadline: isoDaysAgo(45),
    status: 'archived',
    attachments: buildAttachments(4),
    note: null,
    createdAt: isoDaysAgo(60),
  },
];

const ASSIGNMENT_TITLE_POOL = [
  'Responsive Landing Page', 'API Authentication Flow', 'Database Normalization',
  'Mobile UI Kit', 'Data Visualization Dashboard', 'Component Testing with Jest',
  'GraphQL Schema Design', 'CI/CD Pipeline Setup', 'User Research Report',
  'Payment Gateway Integration', 'State Machine Diagram', 'SEO Audit Report',
  'Docker Containerization', 'Wireframe to Prototype', 'Unit Test Coverage',
];

const STATUS_CYCLE = ['active', 'active', 'submitted', 'reviewing', 'overdue', 'active'];
const TECH_POOL = ['React', 'Vue.js', 'Node.js', 'Python', 'Figma', 'Docker', 'MySQL', 'MongoDB', 'Tailwind CSS'];

function buildGeneratedAssignments() {
  return ASSIGNMENT_TITLE_POOL.map((title, index) => {
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const category = CATEGORY_OPTIONS[index % CATEGORY_OPTIONS.length];
    const course = COURSE_OPTIONS[index % COURSE_OPTIONS.length];
    const group = GROUP_OPTIONS[index % GROUP_OPTIONS.length];
    const mentor = MENTOR_OPTIONS[index % MENTOR_OPTIONS.length];
    const deadline = status === 'overdue' ? isoDaysAgo(2 + (index % 5)) : isoDaysAhead(3 + (index % 20));

    return {
      id: `ASG-${9100 + index}`,
      title,
      category,
      course,
      group,
      shortDescription: `${title} bo'yicha amaliy topshiriq. Barcha talablarga muvofiq bajarilishi kerak.`,
      fullDescription: `${title} vazifasi orqali siz nazariy bilimlaringizni amaliyotda qo'llaysiz. Topshiriqni belgilangan muddatda yuboring.`,
      requirements: [
        `${title} texnik talablariga muvofiq bajarilishi shart.`,
        "Kod repozitoriyasi va qisqacha hisobot biriktirilishi kerak.",
      ],
      technologies: [TECH_POOL[index % TECH_POOL.length], TECH_POOL[(index + 3) % TECH_POOL.length]],
      mentor,
      maxScore: 50 + (index % 6) * 20,
      deadline,
      status,
      attachments: buildAttachments(10 + index),
      note: null,
      createdAt: isoDaysAgo(5 + index * 6),
    };
  });
}

export const mockAssignments = [...featuredAssignments, ...buildGeneratedAssignments()];
