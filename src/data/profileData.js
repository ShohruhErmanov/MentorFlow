// ── Profile Page Mock Data ─────────────────────────────────────────────────

export const currentUser = {
  firstName: 'Azizbek',
  lastName: 'Rahimov',
  email: 'azizbek.r@mentorflow.uz',
  phone: '+998901234567',
  role: 'Mentor',
  avatarInitials: 'AR',
  avatarColor: '#2563eb',
};

export const languages = [
  { value: 'uz', label: "O'zbek 🇺🇿" },
  { value: 'en', label: 'English 🇬🇧' },
  { value: 'ru', label: 'Русский 🇷🇺' },
];

export const notificationSettings = [
  {
    id: 'new_tasks',
    label: 'Yangi vazifalar',
    description: "O'quvchilar vazifa yukladiganda",
    defaultChecked: true,
  },
  {
    id: 'group_messages',
    label: 'Guruh xabarlari',
    description: 'Guruh chatlaridagi yangi xabarlar',
    defaultChecked: true,
  },
  {
    id: 'weekly_report',
    label: 'Haftalik hisobot',
    description: 'Davomat va reyting xulosasi',
    defaultChecked: false,
  },
];
