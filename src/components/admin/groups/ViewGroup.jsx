import { Clock } from 'lucide-react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import ProgressBar from '../../ui/ProgressBar';
import StatusBadge from './StatusBadge';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

/**
 * Read-only, richer view for a group (separate from GroupModal, which
 * handles the editable create/edit form). Also the shared destination for
 * the card's "Dars jadvali" / "O'quvchilar" / "Davomat" / "Vazifalar" menu
 * items, since each of those is just a section of this same profile.
 */
export default function ViewGroup({ isOpen, onClose, group }) {
  if (!group) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Guruh ma'lumotlari" className="max-w-2xl">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-[#191b23] dark:text-white">{group.name}</p>
              <StatusBadge status={group.status} />
            </div>
            <p className="mt-0.5 text-sm font-semibold text-[#2563eb] dark:text-blue-400">{group.course}</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={group.mentor.avatarUrl} alt={group.mentor.name} className="h-10 w-10 rounded-full object-cover shadow-sm" />
            <div>
              <p className="text-sm font-bold text-[#191b23] dark:text-white">{group.mentor.name}</p>
              <p className="text-xs font-medium text-[#737686] dark:text-slate-400">Mentor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <InfoField label="Xona" value={group.room} />
          <InfoField label="Maksimal o'quvchilar" value={group.capacity} />
          <InfoField label="Boshlanish sanasi" value={new Date(group.startDate).toLocaleDateString('uz-UZ')} />
          <InfoField label="Tugash sanasi" value={new Date(group.endDate).toLocaleDateString('uz-UZ')} />
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-[#f7f8ff] px-4 py-3 text-sm font-medium text-[#434655] dark:bg-slate-900/60 dark:text-slate-300">
          <Clock size={16} />
          <span>{group.scheduleDays.join(' • ')}</span>
          <span>&bull;</span>
          <span>{group.scheduleTime}</span>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="text-[#191b23] dark:text-white">Kurs o'zlashtirish</span>
            <span className="text-[#737686] dark:text-slate-400">
              {group.lessonsCompleted}/{group.lessonsTotal} Dars
            </span>
          </div>
          <ProgressBar value={group.progressPercent} max={100} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#f7f8ff] px-3 py-3 text-center dark:bg-slate-900/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">O'quvchilar</p>
            <p className="mt-0.5 text-base font-bold text-[#191b23] dark:text-white">{group.studentCount} ta</p>
          </div>
          <div className="rounded-xl bg-[#f7f8ff] px-3 py-3 text-center dark:bg-slate-900/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">O'rt. ball</p>
            <p className="mt-0.5 text-base font-bold text-[#191b23] dark:text-white">{group.avgScore}%</p>
          </div>
          <div className="rounded-xl bg-[#f7f8ff] px-3 py-3 text-center dark:bg-slate-900/60">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#737686] dark:text-slate-400">Davomat</p>
            <p className="mt-0.5 text-base font-bold text-[#191b23] dark:text-white">{group.attendance}%</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Vazifalar
          </p>
          <p className="text-sm font-medium text-[#434655] dark:text-slate-300">
            {group.lessonsCompleted} ta darsdan {group.lessonsTotal} tasi topshirilgan.
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            O'quvchilar ({group.students.length})
          </p>
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {group.students.map((student) => (
              <li
                key={student.name}
                className="flex items-center justify-between rounded-lg border border-[#e1e2ed] px-3 py-2 dark:border-slate-700"
              >
                <div className="flex items-center gap-2.5">
                  <img src={student.avatarUrl} alt={student.name} className="h-8 w-8 rounded-full object-cover" />
                  <span className="text-sm font-semibold text-[#191b23] dark:text-white">{student.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-[#737686] dark:text-slate-400">
                  <span>Davomat: {student.attendance}%</span>
                  <span>Ball: {student.score}%</span>
                </div>
              </li>
            ))}
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
