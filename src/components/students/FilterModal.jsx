import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function FilterModal({ isOpen, onClose, filters, setFilters, onApply }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ group: '', status: '', attendance: '' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filterlar">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Guruh</label>
          <select
            name="group"
            value={filters.group}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">Barchasi</option>
            <option value="Frontend-019">Frontend-019</option>
            <option value="Backend-001">Backend-001</option>
            <option value="Mobile-005">Mobile-005</option>
            <option value="AI-002">AI-002</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Holati</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">Barchasi</option>
            <option value="Faol">Faol</option>
            <option value="Kutish">Kutish</option>
            <option value="To'xtatilgan">To'xtatilgan</option>
            <option value="Yangi">Yangi</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Davomat</label>
          <select
            name="attendance"
            value={filters.attendance}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb]"
          >
            <option value="">Barchasi</option>
            <option value=">95">A'lo (&gt;95%+)</option>
            <option value="80-94">Yaxshi (80-94%)</option>
            <option value="60-79">O'rtacha (60-79%)</option>
            <option value="<60">Past (&lt;60%)</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={handleReset}>Tozalash</Button>
          <Button variant="primary" onClick={onApply}>Qo'llash</Button>
        </div>
      </div>
    </Modal>
  );
}
