// Local demo dataset for per-student submission records.
// Kept separate from mockAssignments.js so assignment metadata and the
// (much larger) submission-level records don't live in the same file.
// No backend — the admin Vazifalar detail page copies these into local
// state and mutates that copy when grading/returning work.

import { mockAssignments, isoDaysAgo } from './mockAssignments';

export const SUBMISSION_STATUS_OPTIONS = [
  { value: 'onTime', label: 'Vaqtida topshirdi' },
  { value: 'late', label: 'Kechikib topshirdi' },
  { value: 'pending', label: 'Topshirmagan' },
];

const STUDENT_FIRST_NAMES = ['Sardor', 'Malika', 'Ibrohim', 'Dilnoza', 'Jasur', 'Nodira', 'Aziz', 'Kamola'];
const STUDENT_LAST_NAMES = ['Abdullayev', 'Karimova', 'Toshmatov', 'Yusupova', 'Rahimov', 'Saidova', 'Nortojiyev', 'Ergasheva'];

// Explicit seat/submission counts for the featured assignments so the first
// one matches the reference screenshot exactly (28/32 submitted, 3 late).
const FEATURED_COUNTS = {
  'ASG-9001': { totalCount: 32, submittedCount: 28, lateCount: 3 },
  'ASG-9002': { totalCount: 35, submittedCount: 15, lateCount: 3 },
  'ASG-9003': { totalCount: 30, submittedCount: 28, lateCount: 1 },
  'ASG-9004': { totalCount: 62, submittedCount: 58, lateCount: 2 },
};

function countsForAssignment(assignment, index) {
  if (FEATURED_COUNTS[assignment.id]) return FEATURED_COUNTS[assignment.id];

  const totalCount = 20 + (index % 10) * 4;
  const submittedCount =
    assignment.status === 'active' ? Math.round(totalCount * 0.4) : Math.round(totalCount * 0.85);
  const lateCount = Math.min(submittedCount, 1 + (index % 5));

  return { totalCount, submittedCount, lateCount };
}

function buildSubmittedFiles(seed, i) {
  if ((seed + i) % 3 === 0) {
    return [{ name: `topshiriq-${i + 1}.pdf`, url: '#', sizeLabel: `${400 + i * 20} KB` }];
  }
  return [
    { name: `loyiha-${i + 1}.zip`, url: '#', sizeLabel: `${2 + (i % 5)} MB` },
    { name: 'README.md', url: '#', sizeLabel: '2 KB' },
  ];
}

function buildSubmissionsForAssignment(assignment, index) {
  const { totalCount, submittedCount, lateCount } = countsForAssignment(assignment, index);
  const seed = index + 1;

  return Array.from({ length: totalCount }).map((_, i) => {
    const firstName = STUDENT_FIRST_NAMES[(seed + i) % STUDENT_FIRST_NAMES.length];
    const lastName = STUDENT_LAST_NAMES[(seed + i * 3) % STUDENT_LAST_NAMES.length];

    let status = 'pending';
    if (i < submittedCount - lateCount) status = 'onTime';
    else if (i < submittedCount) status = 'late';

    const isGraded = status !== 'pending' && i % 4 !== 0;

    return {
      id: `${assignment.id}-S${String(i + 1).padStart(3, '0')}`,
      assignmentId: assignment.id,
      studentName: `${firstName} ${lastName}`,
      avatarUrl: `https://i.pravatar.cc/150?u=asub-${seed}-${i}`,
      group: assignment.group,
      status,
      score: isGraded ? Math.min(assignment.maxScore, Math.round(assignment.maxScore * (0.65 + ((seed + i * 7) % 35) / 100))) : null,
      feedback: isGraded ? "Yaxshi bajarilgan, ba'zi kichik tafsilotlarga e'tibor bering." : null,
      submittedAt: status === 'pending' ? null : isoDaysAgo(i % 6),
      submittedFiles: status === 'pending' ? [] : buildSubmittedFiles(seed, i),
    };
  });
}

const submissionsByAssignmentId = new Map(
  mockAssignments.map((assignment, index) => [assignment.id, buildSubmissionsForAssignment(assignment, index)]),
);

export function getSubmissionsForAssignment(assignmentId) {
  return submissionsByAssignmentId.get(assignmentId) ?? [];
}

export function getSubmissionCountsForAssignment(assignmentId) {
  const submissions = getSubmissionsForAssignment(assignmentId);
  return {
    totalCount: submissions.length,
    submittedCount: submissions.filter((s) => s.status !== 'pending').length,
    lateCount: submissions.filter((s) => s.status === 'late').length,
  };
}
