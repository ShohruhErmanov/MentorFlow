import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import AttendanceBadge from './AttendanceBadge';

export default function HistoryModal({ isOpen, onClose, student }) {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Davomat tarixi — ${student.firstName} ${student.lastName}`} className="max-w-lg">
      <div className="space-y-4">
        <ol className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {student.history.map((entry, index) => (
            <li key={index} className="relative border-l-2 border-[#e1e2ed] pl-4 dark:border-slate-700">
              <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#191b23] dark:text-white">
                  {new Date(entry.date).toLocaleDateString('uz-UZ', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
                <AttendanceBadge status={entry.status} />
              </div>
              {entry.comment && (
                <p className="mt-1 text-xs font-medium text-[#737686] dark:text-slate-400">{entry.comment}</p>
              )}
            </li>
          ))}
        </ol>

        <div className="flex justify-end border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Yopish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
