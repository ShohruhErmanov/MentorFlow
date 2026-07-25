import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';

export default function EditStudentModal({ isOpen, onClose, onSave, student }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    group: '',
    status: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (student && isOpen) {
      setFormData({
        name: student.name || '',
        phone: student.phone || '',
        email: student.email || '',
        group: student.group || '',
        status: student.status || 'Faol'
      });
    }
  }, [student, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSave(student.id, formData);
      setIsSubmitting(false);
    }, 600);
  };

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchi ma'lumotlarini tahrirlash">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">F.I.O</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Telefon</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Guruh</label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600"
            >
              <option value="Frontend-019">Frontend-019</option>
              <option value="Backend-001">Backend-001</option>
              <option value="Mobile-005">Mobile-005</option>
              <option value="AI-002">AI-002</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">Holati</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600"
            >
              <option value="Faol">Faol</option>
              <option value="Kutish">Kutish</option>
              <option value="To'xtatilgan">To'xtatilgan</option>
              <option value="Yangi">Yangi</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed] dark:border-slate-700">
          <Button variant="ghost" type="button" onClick={onClose} disabled={isSubmitting}>Bekor qilish</Button>
          <LoadingButton variant="primary" type="submit" isLoading={isSubmitting} loadingText="Saqlanmoqda...">
            Saqlash
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
