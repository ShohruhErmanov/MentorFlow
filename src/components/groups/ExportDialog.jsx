import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';
import { FileSpreadsheet, FileText } from 'lucide-react';
import clsx from 'clsx';

export default function ExportDialog({ isOpen, onClose, onExport }) {
  const [format, setFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate generation and download
    setTimeout(() => {
      setIsExporting(false);
      onExport(format);
    }, 1200);
  };

  const options = [
    { id: 'csv', label: 'CSV formatida', icon: FileText, desc: 'Excel va boshqa dasturlar uchun' },
    { id: 'excel', label: 'Excel (XLSX)', icon: FileSpreadsheet, desc: 'Jadvallar va hisobotlar uchun' },
    { id: 'pdf', label: 'PDF hujjat', icon: FileText, desc: "Chop etish va o'qish uchun qulay" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ma'lumotlarni yuklab olish (Export)">
      <div className="space-y-4">
        <p className="text-sm text-[#737686] mb-4">
          Qaysi formatda yuklab olishni xohlaysiz? O'zingizga qulay formatni tanlang.
        </p>

        <div className="grid gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFormat(opt.id)}
              className={clsx(
                "flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200",
                format === opt.id 
                  ? "border-[#2563eb] bg-[#f3f3fe] shadow-sm ring-1 ring-[#2563eb]" 
                  : "border-[#e1e2ed] bg-white hover:border-[#2563eb]/50 hover:bg-gray-50"
              )}
            >
              <div className={clsx(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                format === opt.id ? "bg-[#2563eb] text-white" : "bg-gray-100 text-[#737686]"
              )}>
                <opt.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#191b23]">{opt.label}</h4>
                <p className="text-xs font-medium text-[#737686]">{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={onClose} disabled={isExporting}>Bekor qilish</Button>
          <LoadingButton 
            variant="primary" 
            onClick={handleExport} 
            isLoading={isExporting} 
            loadingText="Tayyorlanmoqda..."
          >
            Yuklab olish
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
