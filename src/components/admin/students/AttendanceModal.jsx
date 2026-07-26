import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { ATTENDANCE_STATUS_OPTIONS } from '../../../constants/mockStudents';

const HISTORY_STATUS_META = {
  present: { label: 'Keldi', className: 'text-emerald-700 dark:text-emerald-400' },
  absent: { label: 'Kelmadi', className: 'text-red-700 dark:text-red-400' },
  late: { label: 'Kechikdi', className: 'text-amber-700 dark:text-amber-400' },
};

export default function AttendanceModal({ isOpen, onClose, student, onUpdate }) {
  const [status, setStatus] = useState('present');

  useEffect(() => {
    if (isOpen) setStatus('present');
  }, [isOpen, student]);

  if (!student) return null;

  const handleSave = () => onUpdate(student.id, status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Davomat — ${student.firstName} ${student.lastName}`}>
      <div className="space-y-5">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Select
              label="Bugungi holatni belgilash"
              options={ATTENDANCE_STATUS_OPTIONS}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleSave}>
            Saqlash
          </Button>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Davomat tarixi
          </p>
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {student.attendanceHistory.map((entry, index) => {
              const meta = HISTORY_STATUS_META[entry.status] ?? HISTORY_STATUS_META.present;
              return (
                <li
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm dark:border-slate-700"
                >
                  <span className="text-[#434655] dark:text-slate-300">
                    {new Date(entry.date).toLocaleDateString('uz-UZ')}
                  </span>
                  <span className={clsx('font-semibold', meta.className)}>{meta.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-end border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Yopish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
