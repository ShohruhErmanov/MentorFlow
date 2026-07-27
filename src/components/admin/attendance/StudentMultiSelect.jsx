import Checkbox from '../../ui/Checkbox';
import ValidationMessage from '../../ui/ValidationMessage';

export default function StudentMultiSelect({ students, selectedIds, onChange, error }) {
  const toggle = (id) => {
    onChange(selectedIds.includes(id) ? selectedIds.filter((sid) => sid !== id) : [...selectedIds, id]);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#191b23] dark:text-slate-200">O'quvchilar</p>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{selectedIds.length} ta tanlangan</p>
      </div>
      <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-[#e1e2ed] p-3 dark:border-slate-600">
        {students.length === 0 && (
          <p className="py-4 text-center text-sm text-[#737686] dark:text-slate-400">
            Ushbu guruhda o'quvchi topilmadi
          </p>
        )}
        {students.map((student) => (
          <Checkbox
            key={student.id}
            id={`attendance-student-${student.id}`}
            label={`${student.firstName} ${student.lastName}`}
            checked={selectedIds.includes(student.id)}
            onChange={() => toggle(student.id)}
          />
        ))}
      </div>
      <ValidationMessage message={error} />
    </div>
  );
}
