/**
 * Shared deadline/status → display text + tone mapping, reused by both the
 * assignment grid card and the assignment details page so the logic only
 * lives in one place.
 */
export function getDeadlineStatus(assignment) {
  if (assignment.status === 'archived') {
    return { label: 'Arxiv', tone: 'neutral' };
  }

  const deadline = new Date(assignment.deadline);
  const now = new Date();
  const isSameDay = deadline.toDateString() === now.toDateString();

  if (isSameDay) {
    return { label: 'Bugun tugaydi', tone: 'danger' };
  }

  if (deadline < now) {
    return {
      label: `Kechikkan: ${deadline.toLocaleDateString('uz-UZ')}`,
      tone: 'danger',
    };
  }

  return {
    label: `Deadline: ${deadline.toLocaleDateString('uz-UZ')}, ${deadline.toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
    })}`,
    tone: 'neutral',
  };
}
