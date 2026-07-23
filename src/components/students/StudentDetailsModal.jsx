import Modal from '../ui/Modal';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import AttendanceProgress from './AttendanceProgress';

export default function StudentDetailsModal({ isOpen, onClose, student }) {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchi ma'lumotlari">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <img src={student.avatar} alt={student.name} className="h-16 w-16 rounded-full object-cover shadow-sm" />
          <div>
            <h3 className="text-xl font-bold text-[#191b23]">{student.name}</h3>
            <p className="text-sm font-medium text-[#737686]">ID: {student.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#e1e2ed] bg-gray-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-[#737686]">Telefon</p>
            <p className="mt-1 text-sm font-medium text-[#191b23]">{student.phone}</p>
          </div>
          <div className="rounded-xl border border-[#e1e2ed] bg-gray-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-[#737686]">Email</p>
            <p className="mt-1 text-sm font-medium text-[#191b23]">{student.email}</p>
          </div>
          <div className="rounded-xl border border-[#e1e2ed] bg-gray-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-[#737686]">Guruh</p>
            <p className="mt-1 text-sm font-medium text-[#191b23]">{student.group}</p>
          </div>
          <div className="rounded-xl border border-[#e1e2ed] bg-gray-50/50 p-4">
            <p className="text-xs font-semibold uppercase text-[#737686]">Holati</p>
            <div className="mt-1">
              <StatusBadge status={student.status} />
            </div>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase text-[#737686]">O'zlashtirish va Davomat</p>
          <div className="space-y-3 rounded-xl border border-[#e1e2ed] bg-white p-4">
            <div>
              <div className="mb-1 flex justify-between text-sm font-medium">
                <span className="text-[#434655]">Davomat</span>
              </div>
              <AttendanceProgress percentage={student.attendance} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm font-medium">
                <span className="text-[#434655]">O'rtacha ball</span>
                <span className="font-bold text-[#191b23]">{student.score}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${student.score}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm font-medium">
                <span className="text-[#434655]">Bajarilgan vazifalar</span>
                <span className="font-bold text-[#191b23]">{student.completedAssignments} ta</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={onClose}>Yopish</Button>
        </div>
      </div>
    </Modal>
  );
}
