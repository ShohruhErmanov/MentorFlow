import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';

export default function ExportModal({ isOpen, onClose, onExport }) {
  const [format, setFormat] = useState('excel');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      onExport(format);
      setIsExporting(false);
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ma'lumotlarni yuklab olish">
      <div className="space-y-4">
        <p className="text-sm text-[#737686]">
          O'quvchilar ro'yxatini qaysi formatda yuklab olmoqchisiz?
        </p>

        <div className="grid grid-cols-3 gap-3">
          {['excel', 'csv', 'pdf'].map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`rounded-xl border p-4 text-center transition-all ${
                format === f
                  ? 'border-[#2563eb] bg-[#f3f3fe] text-[#2563eb]'
                  : 'border-[#e1e2ed] hover:border-[#2563eb] hover:bg-gray-50'
              }`}
            >
              <span className="block font-bold uppercase">{f}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={onClose} disabled={isExporting}>
            Bekor qilish
          </Button>
          <LoadingButton variant="primary" onClick={handleExport} isLoading={isExporting} loadingText="Yuklanmoqda...">
            Yuklab olish
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
