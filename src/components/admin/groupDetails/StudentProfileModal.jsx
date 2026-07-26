import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Avatar from '../../ui/Avatar';
import AttendanceProgress from '../../students/AttendanceProgress';
import StudentStatusBadge from './StudentStatusBadge';

function InfoField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

export default function StudentProfileModal({ isOpen, onClose, student }) {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchi profili" className="max-w-lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar
            initials={student.name.split(' ').map((p) => p[0]).join('')}
            src={student.avatarUrl}
            size="lg"
          />
          <div>
            <p className="text-lg font-bold text-[#191b23] dark:text-white">{student.name}</p>
            <div className="mt-1.5">
              <StudentStatusBadge status={student.status} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <InfoField label="ID" value={student.id} />
          <InfoField label="Reyting" value={`${student.rank}-o'rin`} />
          <InfoField label="O'rtacha baho" value={`${student.score}%`} />
          <InfoField label="Telefon" value={student.phone} />
          <InfoField label="Ota-ona" value={student.parentName} />
          <InfoField label="Ota-ona telefoni" value={student.parentPhone} />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            Davomat
          </p>
          <AttendanceProgress percentage={student.attendance} />
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
