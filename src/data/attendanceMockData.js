// Mock data for specific student history and comments

export const studentHistoryMock = {
  1: [
    { id: 1, date: '07.10.2025', time: '14:00', status: 'present', comment: '-' },
    { id: 2, date: '05.10.2025', time: '14:05', status: 'present', comment: '-' },
    { id: 3, date: '02.10.2025', time: '14:15', status: 'late', comment: 'Tirbandlik' },
    { id: 4, date: '30.09.2025', time: '-', status: 'absent', comment: 'Betob' },
    { id: 5, date: '28.09.2025', time: '14:00', status: 'present', comment: '-' },
  ],
  2: [
    { id: 1, date: '07.10.2025', time: '14:15', status: 'late', comment: 'Tirbandlik sababli' },
    { id: 2, date: '05.10.2025', time: '14:00', status: 'present', comment: '-' },
    { id: 3, date: '02.10.2025', time: '14:00', status: 'present', comment: '-' },
  ],
  // Fallback for others
  default: [
    { id: 1, date: '07.10.2025', time: '14:00', status: 'present', comment: '-' },
    { id: 2, date: '05.10.2025', time: '-', status: 'absent', comment: 'Sababsiz' },
    { id: 3, date: '02.10.2025', time: '14:00', status: 'present', comment: '-' },
  ]
};

export const studentCommentsMock = {
  1: [
    { id: 1, date: '02.10.2025', text: "O'quvchi tez-tez kechikishni boshladi. Ota-onasi bilan gaplashish kerak." },
    { id: 2, date: '15.09.2025', text: 'Uy vazifalarini vaqtida topshiryapti. Yaxshi.' },
  ],
  2: [
    { id: 1, date: '07.10.2025', text: 'Bugun ham tirbandlik sababli kechikdi.' }
  ],
  default: [
    { id: 1, date: '01.10.2025', text: 'Odatdagi ishtirok.' }
  ]
};
