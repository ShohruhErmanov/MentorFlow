import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Avatar from '../../ui/Avatar';
import AttendanceProgress from '../../students/AttendanceProgress';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

/**
 * Read-only, richer profile view for a parent (separate from ParentModal,
 * which handles the editable create/edit form).
 */
export default function ProfileModal({ isOpen, onClose, parent }) {
  if (!parent) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ota-ona profili" className="max-w-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar
            initials={`${parent.firstName[0]}${parent.lastName[0]}`}
            src={parent.avatarUrl}
            size="lg"
          />
          <div>
            <p className="text-lg font-bold text-[#191b23] dark:text-white">
              {parent.firstName} {parent.lastName}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <StatusBadge status={parent.status} />
              <PaymentBadge status={parent.paymentStatus} overdueDays={parent.overdueDays} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoField label="Email" value={parent.email} />
          <InfoField label="Telefon" value={parent.phone} />
          <InfoField label="Username" value={parent.username} />
          <InfoField label="ID" value={parent.id} />
          <InfoField label="Manzil" value={parent.address} />
          <InfoField label="Oxirgi kirish" value={parent.lastLoginDisplay} />
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Farzandlari
          </p>
          <ul className="space-y-3">
            {parent.children.map((child) => (
              <li key={child.name} className="rounded-xl border border-[#e1e2ed] p-4 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-[#191b23] dark:text-white">{child.name}</p>
                  <span className="text-xs font-semibold text-[#2563eb] dark:text-blue-400">
                    {child.group} &bull; {child.mentor}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
                    Davomat
                  </p>
                  <AttendanceProgress percentage={child.attendance} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
                      To'langan
                    </p>
                    <p className="text-sm font-bold text-[#191b23] dark:text-white">
                      {child.totalPaid.toLocaleString('en-US')} so'm
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
                      Vazifalar
                    </p>
                    <p className="text-sm font-bold text-[#191b23] dark:text-white">
                      {child.assignmentsCompleted}/{child.assignmentsTotal}
                    </p>
                  </div>
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
