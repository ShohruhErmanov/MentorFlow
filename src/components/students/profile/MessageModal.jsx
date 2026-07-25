import { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import LoadingButton from '../../ui/LoadingButton';

export default function MessageModal({ isOpen, onClose, studentName }) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessage('');
      onClose();
    }, 800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xabar yozish">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-300">
            Kimga: <span className="font-bold text-[#191b23] dark:text-white">{studentName}</span>
          </label>
          <textarea
            rows={5}
            placeholder="Xabar matnini kiriting..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none rounded-lg border border-[#e1e2ed] p-3 text-sm outline-none focus:border-[#2563eb] dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:placeholder:text-slate-500"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed] dark:border-slate-700">
          <Button variant="ghost" onClick={onClose} disabled={isSending}>
            Bekor qilish
          </Button>
          <LoadingButton 
            variant="primary" 
            onClick={handleSend} 
            isLoading={isSending} 
            loadingText="Yuborilmoqda..."
            disabled={!message.trim()}
          >
            Yuborish
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
