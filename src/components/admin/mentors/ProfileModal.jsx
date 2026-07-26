import { Star } from 'lucide-react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import WeeklyActivityChart from './WeeklyActivityChart';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

/**
 * Read-only, richer profile view for a mentor (separate from MentorModal,
 * which handles the editable create/edit form).
 */
export default function ProfileModal({ isOpen, onClose, mentor }) {
  if (!mentor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mentor profili" className="max-w-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={mentor.avatarUrl}
              alt={`${mentor.firstName} ${mentor.lastName}`}
              className="h-16 w-16 rounded-full object-cover shadow-sm"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-800 ${
                mentor.isOnline ? 'bg-emerald-500' : 'bg-amber-400'
              }`}
            />
          </div>
          <div>
            <p className="text-lg font-bold text-[#191b23] dark:text-white">
              {mentor.firstName} {mentor.lastName}
            </p>
            <p className="text-sm font-semibold text-[#2563eb] dark:text-blue-400">{mentor.specializationLabel}</p>
            <p className="mt-0.5 text-xs font-medium text-[#737686] dark:text-slate-400">
              {mentor.isOnline ? 'Onlayn' : 'Oflayn'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <InfoField
            label="Reyting"
            value={
              <span className="inline-flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {mentor.rating.toFixed(1)}
              </span>
            }
          />
          <InfoField label="Tajriba" value={`${mentor.experienceYears} yil`} />
          <InfoField label="O'quvchilar" value={mentor.studentCount} />
          <InfoField label="Davomat" value={`${mentor.attendance}%`} />
          <InfoField label="Guruhlar" value={mentor.groups.join(', ')} />
          <InfoField label="Holati" value={mentor.status === 'active' ? 'Faol' : 'Nofaol'} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoField label="Email" value={mentor.email} />
          <InfoField label="Telefon" value={mentor.phone} />
          <InfoField label="Username" value={mentor.username} />
          <InfoField label="ID" value={mentor.id} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">Bio</p>
          <p className="mt-1 text-sm leading-relaxed text-[#434655] dark:text-slate-300">{mentor.bio}</p>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Haftalik faollik
          </p>
          <WeeklyActivityChart data={mentor.weeklyActivity} trend={mentor.activityTrend} />
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
