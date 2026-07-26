import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
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
 * Read-only, richer profile view for a student (separate from StudentModal,
 * which handles the editable create/edit form).
 */
export default function ProfileModal({ isOpen, onClose, student }) {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchi profili" className="max-w-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={student.avatarUrl}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-16 w-16 rounded-full object-cover shadow-sm"
          />
          <div>
            <p className="text-lg font-bold text-[#191b23] dark:text-white">
              {student.firstName} {student.lastName}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <StatusBadge status={student.status} />
              <PaymentBadge status={student.paymentStatus} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <InfoField label="Mentor" value={student.mentorName} />
          <InfoField label="Guruh" value={student.group} />
          <InfoField label="Ota-ona" value={student.parentName} />
          <InfoField label="Reyting" value={student.rating} />
          <InfoField label="Balans" value={`${student.balance.toLocaleString('en-US')} so'm`} />
          <InfoField label="Vazifalar" value={`${student.assignments.completed}/${student.assignments.total}`} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Davomat
          </p>
          <AttendanceProgress percentage={student.attendance} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoField label="Email" value={student.email} />
          <InfoField label="Telefon" value={student.phone} />
          <InfoField label="Username" value={student.username} />
          <InfoField label="ID" value={student.id} />
          <InfoField label="Tug'ilgan sana" value={new Date(student.birthDate).toLocaleDateString('uz-UZ')} />
          <InfoField label="Jinsi" value={student.gender === 'male' ? 'Erkak' : 'Ayol'} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Oxirgi to'lovlar
          </p>
          <ul className="space-y-2">
            {student.payments.slice(0, 3).map((payment) => (
              <li key={payment.id} className="flex items-center justify-between text-sm">
                <span className="text-[#434655] dark:text-slate-300">
                  {new Date(payment.date).toLocaleDateString('uz-UZ')} &bull; {payment.method}
                </span>
                <span className="font-bold text-[#191b23] dark:text-white">
                  {payment.amount.toLocaleString('en-US')} so'm
                </span>
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
