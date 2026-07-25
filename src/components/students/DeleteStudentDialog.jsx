import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function DeleteStudentDialog({ isOpen, onClose, onConfirm, studentName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchini o'chirish" className="max-w-md">
      <div className="space-y-4">
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-red-500/10 dark:text-red-400">
          <p>
            Siz rostda ham <strong>{studentName}</strong> ni ro'yxatdan o'chirib tashlamoqchimisiz?
            Bu amalni bekor qilib bo'lmaydi va barcha ma'lumotlar o'chib ketadi.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed] dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button 
            variant="primary" 
            className="bg-red-600 hover:bg-red-700" 
            onClick={onConfirm}
          >
            O'chirish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
