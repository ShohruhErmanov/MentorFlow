// Local demo dataset for the Admin "Ota-onalar" management page.
// No backend — every mutation (create/edit/message/block/delete) only updates in-memory state.

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: 'paid', label: "To'langan" },
  { value: 'overdue', label: 'Kechikkan' },
  { value: 'debt', label: 'Qarz' },
];

export const GROUP_OPTIONS = ['Frontend-G1', 'Design-B2', 'Python-G3', 'Backend-G2', 'Mobile-B1', 'Data-G4'];
export const MENTOR_OPTIONS = ['Jasur A.', 'Nilufar B.', 'Rustam T.', 'Umid B.', 'Kamola S.'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'oldest', label: 'Eng eski' },
  { value: 'name', label: 'Ism bo\'yicha (A-Z)' },
];

// Baseline platform-wide numbers this page's counts/aggregates are layered
// on top of — same approach used across the other Admin pages.
export const PARENT_STAT_BASELINE = {
  total: 548,
  active: 512,
  childrenCount: 836,
  overdueCount: 28,
  todayLogins: 142,
};

const DAY_MS = 24 * 60 * 60 * 1000;
function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

const featuredParents = [
  {
    id: 'PR-3301',
    firstName: 'Lola',
    lastName: 'Karimova',
    username: 'lola.k',
    email: 'lola.k@email.com',
    phone: '+998 90 123 45 67',
    address: 'Toshkent sh., Chilonzor tumani',
    avatarUrl: 'https://i.pravatar.cc/150?u=parent-3301',
    status: 'active',
    paymentStatus: 'paid',
    overdueDays: 0,
    lastLoginDisplay: 'Bugun, 09:42',
    lastLoginAt: isoDaysAgo(0),
    children: [
      { name: 'Azizbek Rahimov', group: 'Frontend-G1', mentor: 'Jasur A.', attendance: 92, totalPaid: 3600000, assignmentsCompleted: 16, assignmentsTotal: 20 },
      { name: 'Nargiza Qodirova', group: 'Design-B2', mentor: 'Nilufar B.', attendance: 88, totalPaid: 2400000, assignmentsCompleted: 14, assignmentsTotal: 18 },
    ],
    createdAt: isoDaysAgo(280),
  },
  {
    id: 'PR-3302',
    firstName: 'Dilshod',
    lastName: 'Rustamov',
    username: 'dilshod.r',
    email: 'dilshod@example.com',
    phone: '+998 93 456 78 90',
    address: 'Toshkent sh., Yunusobod tumani',
    avatarUrl: null,
    status: 'active',
    paymentStatus: 'overdue',
    overdueDays: 3,
    lastLoginDisplay: 'Kecha, 18:20',
    lastLoginAt: isoDaysAgo(1),
    children: [
      { name: 'Rustam Toshpulatov', group: 'Python-G3', mentor: 'Rustam T.', attendance: 76, totalPaid: 1800000, assignmentsCompleted: 10, assignmentsTotal: 20 },
    ],
    createdAt: isoDaysAgo(190),
  },
  {
    id: 'PR-3303',
    firstName: 'Murod',
    lastName: 'Aliyev',
    username: 'murod.a',
    email: 'murod.aliyev@mail.uz',
    phone: '+998 99 111 22 33',
    address: 'Toshkent sh., Mirobod tumani',
    avatarUrl: 'https://i.pravatar.cc/150?u=parent-3303',
    status: 'inactive',
    paymentStatus: 'paid',
    overdueDays: 0,
    lastLoginDisplay: '12.03.2023',
    lastLoginAt: isoDaysAgo(500),
    children: [
      { name: 'Sardor Aliyev', group: 'Backend-G2', mentor: 'Umid B.', attendance: 95, totalPaid: 4200000, assignmentsCompleted: 19, assignmentsTotal: 20 },
    ],
    createdAt: isoDaysAgo(610),
  },
];

const NAME_POOL = [
  ['Shahnoza', 'Yusupova'],
  ['Bekzod', 'Nortojiyev'],
  ['Gulnora', 'Ergasheva'],
  ['Farrux', 'Abdullayev'],
  ['Nodira', 'Saidova'],
  ['Javlon', 'Mirzayev'],
  ['Zarina', 'Yoqubova'],
  ['Ilhom', 'Tursunov'],
  ['Madina', 'Bekova'],
  ['Sherzod', 'Rashidov'],
  ['Nigora', 'Umarova'],
  ['Aziz', 'Sultonov'],
  ['Laylo', 'Nazarova'],
  ['Islom', 'Ismoilov'],
  ['Feruza', 'Xasanova'],
  ['Davron', 'Yusupov'],
  ['Ozoda', 'Karimova'],
  ['Timur', 'Rasulova'],
];

const STATUS_CYCLE = ['active', 'active', 'active', 'inactive', 'active'];
const PAYMENT_CYCLE = ['paid', 'paid', 'overdue', 'paid', 'debt', 'paid'];
const CHILD_NAME_POOL = [
  'Alisher', 'Malika', 'Sardor', 'Dilnoza', 'Javohir', 'Kamola', 'Bobur', 'Nilufar', 'Sanjar', 'Ra\'no',
];

function buildGeneratedParents() {
  return NAME_POOL.map(([firstName, lastName], index) => {
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const paymentStatus = PAYMENT_CYCLE[index % PAYMENT_CYCLE.length];
    const group = GROUP_OPTIONS[index % GROUP_OPTIONS.length];
    const mentor = MENTOR_OPTIONS[index % MENTOR_OPTIONS.length];
    const username = `${firstName}.${lastName}`.toLowerCase();
    const childName = `${CHILD_NAME_POOL[index % CHILD_NAME_POOL.length]} ${lastName}`;

    return {
      id: `PR-${3400 + index}`,
      firstName,
      lastName,
      username,
      email: `${username}@mentorflow.uz`,
      phone: `+998 9${index % 10} ${300 + index * 3} ${10 + (index % 80)} ${20 + (index % 70)}`,
      address: 'Toshkent sh.',
      avatarUrl: index % 3 === 0 ? null : `https://i.pravatar.cc/150?u=parent-${3400 + index}`,
      status,
      paymentStatus,
      overdueDays: paymentStatus === 'overdue' ? 2 + (index % 5) : 0,
      lastLoginDisplay: index % 2 === 0 ? `${index + 1} kun oldin` : `${(index % 9) + 1} hafta oldin`,
      lastLoginAt: isoDaysAgo(index + 2),
      children: [
        {
          name: childName,
          group,
          mentor,
          attendance: 60 + ((index * 7) % 38),
          totalPaid: 1200000 + index * 45000,
          assignmentsCompleted: 5 + (index % 15),
          assignmentsTotal: 20,
        },
      ],
      createdAt: isoDaysAgo(60 + index * 8),
    };
  });
}

export const mockParents = [...featuredParents, ...buildGeneratedParents()];
