/** Format a Date to Uzbek locale long form: "24 sentyabr 2024" */
export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat('uz-UZ', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  }).format(date)
}

/** Format date short: "24 sent." */
export function formatDateShort(date = new Date()) {
  return new Intl.DateTimeFormat('uz-UZ', {
    month: 'short',
    day:   'numeric',
  }).format(date)
}

/** "Dushanba", "Seshanba" etc. */
export function getDayName(date = new Date()) {
  return new Intl.DateTimeFormat('uz-UZ', { weekday: 'long' }).format(date)
}

/** Time-based greeting in Uzbek */
export function getGreeting() {
  const h = new Date().getHours()
  if (h < 5)  return 'Xayrli tun'
  if (h < 12) return 'Xayrli tong'
  if (h < 17) return 'Xayrli kun'
  return 'Xayrli kech'
}
