// Local demo dataset for the Admin "Foydalanuvchilar" management page.
// No backend — every mutation (create/edit/block/delete) only updates in-memory state.

export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'student', label: "O'quvchi" },
  { value: 'parent', label: 'Ota-ona' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
  { value: 'blocked', label: 'Bloklangan' },
];

// Baseline counts representing the platform's full (not individually-modeled)
// user base. Records created/edited/blocked through this page are layered on
// top of these numbers so the stat cards stay truthful to what's on screen.
export const USER_STAT_BASELINE = {
  total: 1284,
  active: 1152,
  newThisMonth: 48,
  blocked: 14,
};

const DAY_MS = 24 * 60 * 60 * 1000;

function isoDaysAgo(days) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

const AVATAR_COLORS = ['#2563eb', '#f97316', '#c11d5e', '#16a34a', '#7c3aed', '#0891b2'];

const NAME_POOL = [
  ['Azizbek', 'Toshpulatov'],
  ['Malika', 'Yusupova'],
  ['Sardor', 'Raxmatov'],
  ['Dilnoza', 'Toshmatova'],
  ['Nodira', 'Qodirova'],
  ['Javlon', 'Nortojiyev'],
  ['Kamola', 'Ergasheva'],
  ['Bekzod', 'Toirov'],
  ['Shahnoza', 'Xolova'],
  ['Farrux', 'Abdullayev'],
  ['Gulnora', 'Saidova'],
  ['Ilhom', 'Mirzayev'],
  ['Zarina', 'Yoqubova'],
  ['Rustam', 'Tursunov'],
  ['Madina', 'Bekova'],
  ['Sherzod', 'Rashidov'],
  ['Nigora', 'Umarova'],
  ['Aziz', 'Karimov'],
  ['Laylo', 'Rasulova'],
  ['Islom', 'Sultonov'],
  ['Feruza', 'Nazarova'],
  ['Davron', 'Ismoilov'],
  ['Ozoda', 'Xasanova'],
  ['Timur', 'Yusupov'],
];

const ROLE_CYCLE = ['student', 'mentor', 'parent', 'student', 'admin', 'student', 'parent', 'mentor'];
const STATUS_CYCLE = ['active', 'active', 'active', 'inactive', 'active', 'blocked', 'active', 'active'];
const LOGIN_CYCLE = [
  { display: 'Bugun, 09:15', daysAgo: 0 },
  { display: 'Kecha, 21:05', daysAgo: 1 },
  { display: '2 kun oldin', daysAgo: 2 },
  { display: '3 kun oldin', daysAgo: 3 },
  { display: '1 hafta oldin', daysAgo: 7 },
  { display: '2 hafta oldin', daysAgo: 14 },
  { display: '1 oy oldin', daysAgo: 30 },
];

function buildGeneratedUsers() {
  return NAME_POOL.map(([firstName, lastName], index) => {
    const role = ROLE_CYCLE[index % ROLE_CYCLE.length];
    const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
    const login = LOGIN_CYCLE[index % LOGIN_CYCLE.length];
    const username = `${firstName}.${lastName}`.toLowerCase();

    return {
      id: `MF-${2001 + index}`,
      firstName,
      lastName,
      username,
      email: `${username}@mentorflow.uz`,
      phone: `+998 9${index % 10} ${100 + index * 3} ${10 + (index % 80)} ${20 + (index % 70)}`,
      role,
      status,
      avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
      lastLoginDisplay: login.display,
      lastLoginAt: isoDaysAgo(login.daysAgo),
      createdAt: isoDaysAgo(120 + index * 11),
    };
  });
}

// The first four entries intentionally mirror the reference screenshot.
const featuredUsers = [
  {
    id: 'MF-9401',
    firstName: 'Dilnoza',
    lastName: 'Rahmonova',
    username: 'dilnoza.r',
    email: 'dilnoza@mentorflow.uz',
    phone: '+998 90 123 45 67',
    role: 'mentor',
    status: 'active',
    avatarColor: '#2563eb',
    lastLoginDisplay: 'Bugun, 10:45',
    lastLoginAt: isoDaysAgo(0),
    createdAt: isoDaysAgo(210),
  },
  {
    id: 'MF-8212',
    firstName: 'Abduvohid',
    lastName: 'Karimov',
    username: 'a.karimov',
    email: 'a.karimov@mail.uz',
    phone: '+998 93 555 11 22',
    role: 'parent',
    status: 'active',
    avatarColor: '#7c3aed',
    lastLoginDisplay: 'Kecha, 18:20',
    lastLoginAt: isoDaysAgo(1),
    createdAt: isoDaysAgo(340),
  },
  {
    id: 'MF-7734',
    firstName: 'Jasur',
    lastName: 'Alimov',
    username: 'jasur.student',
    email: 'jasur.student@gmail.com',
    phone: '+998 97 888 77 66',
    role: 'student',
    status: 'blocked',
    avatarColor: '#f97316',
    lastLoginDisplay: '12 Iyul, 2023',
    lastLoginAt: isoDaysAgo(380),
    createdAt: isoDaysAgo(520),
  },
  {
    id: 'MF-1002',
    firstName: 'Otabek',
    lastName: 'Sobirov',
    username: 'o.sobirov',
    email: 'o.sobirov@mentorflow.uz',
    phone: '+998 33 000 44 55',
    role: 'admin',
    status: 'active',
    avatarColor: '#16a34a',
    lastLoginDisplay: 'Hozir faol',
    lastLoginAt: isoDaysAgo(0),
    createdAt: isoDaysAgo(700),
  },
];

export const mockUsers = [...featuredUsers, ...buildGeneratedUsers()];
