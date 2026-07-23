import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';
import FileDropzone from '../ui/FileDropzone';

export default function ImportDialog({ isOpen, onClose, onImport }) {
  const [file, setFile] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = () => {
    if (!file) return;
    setIsImporting(true);
    
    // Simulate parsing and importing
    setTimeout(() => {
      setIsImporting(false);
      onImport(file);
      setFile(null); // Reset after successful import
    }, 1500);
  };

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Guruhlarni import qilish">
      <div className="space-y-4">
        <p className="text-sm text-[#737686]">
          Guruhlar ro'yxati mavjud bo'lgan CSV yoki Excel faylini yuklang. 
          Kiritilgan ma'lumotlar joriy ro'yxatga qo'shiladi.
        </p>

        <FileDropzone onFileSelect={setFile} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />

        {file && (
          <div className="mt-4 border border-[#e1e2ed] rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-[#e1e2ed]">
              <p className="text-xs font-semibold text-[#434655]">Preview (Fake Data)</p>
            </div>
            <div className="p-4 text-sm text-[#737686]">
              <p>✔ 15 ta guruh topildi</p>
              <p>✔ Ustunlar formati to'g'ri</p>
              <p className="mt-2 font-medium text-[#191b23]">Import qilishga tayyor.</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={handleClose} disabled={isImporting}>Bekor qilish</Button>
          <LoadingButton 
            variant="primary" 
            onClick={handleImport} 
            disabled={!file} 
            isLoading={isImporting} 
            loadingText="Import qilinmoqda..."
          >
            Import
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
