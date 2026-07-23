import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function DeleteAssignmentDialog({ isOpen, onClose, onConfirm, assignmentTitle }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vazifani o'chirish" className="max-w-md">
      <div className="space-y-4">
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <p>
            Siz rostda ham <strong>{assignmentTitle}</strong> nomli vazifani o'chirib tashlamoqchimisiz?
            Bu amalni bekor qilib bo'lmaydi.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
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
