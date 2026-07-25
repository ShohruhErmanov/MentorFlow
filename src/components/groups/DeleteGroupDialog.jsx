import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function DeleteGroupDialog({ isOpen, onClose, onConfirm, groupName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Guruhni o'chirish">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          <AlertTriangle size={28} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-[#191b23] dark:text-white">Haqiqatan ham o'chirmoqchimisiz?</h3>
        <p className="mb-6 text-sm font-medium text-[#737686] dark:text-slate-400">
          Siz haqiqatan ham <strong className="text-[#191b23] dark:text-white">{groupName}</strong> guruhini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
        </p>
        <div className="flex w-full gap-3">
          <Button variant="ghost" className="flex-1 border border-[#e1e2ed] dark:border-slate-700" onClick={onClose}>
            Bekor qilish
          </Button>
          <Button
            variant="primary"
            className="flex-1 !bg-red-600 hover:!bg-red-700 focus-visible:!ring-red-600 shadow-[0_10px_24px_rgba(220,38,38,0.22)]"
            onClick={onConfirm}
          >
            Ha, o'chirish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
