import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import SearchInput from '../../ui/SearchInput';
import { CATEGORY_OPTIONS, DURATION_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockCourses';

export default function AdvancedFilterModal({ isOpen, onClose, filters, setFilters, onApply, onReset }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kengaytirilgan filter">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Qidiruv</label>
          <SearchInput
            placeholder="Kurs nomi, kategoriya yoki mentor..."
            name="search"
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Kategoriya</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Barchasi</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Mentor</label>
          <select
            name="mentor"
            value={filters.mentor}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Barchasi</option>
            {MENTOR_OPTIONS.map((mentor) => (
              <option key={mentor.name} value={mentor.name}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Davomiylik</label>
          <select
            name="duration"
            value={filters.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Barchasi</option>
            {DURATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Holat</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="">Barchasi</option>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onReset}>
            Tozalash
          </Button>
          <Button variant="primary" onClick={onApply}>
            Qo'llash
          </Button>
        </div>
      </div>
    </Modal>
  );
}
