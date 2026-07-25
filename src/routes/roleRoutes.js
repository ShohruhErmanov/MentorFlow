export const ROLE_DEFAULT_PATH = {
  admin: '/admin/dashboard',
  mentor: '/mentor/dashboard',
  student: '/student/dashboard',
  parent: '/parent/dashboard',
};

export function getDefaultPathForRole(role) {
  return ROLE_DEFAULT_PATH[role] ?? '/login';
}

const ROLE_LABEL = {
  admin: 'Super Admin',
  mentor: 'Mentor',
  student: "O'quvchi",
  parent: 'Ota-ona',
};

export function getRoleLabel(role) {
  return ROLE_LABEL[role] ?? role;
}
