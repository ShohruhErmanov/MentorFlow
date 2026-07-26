import { useEffect, useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import PaymentBadge from './PaymentBadge';

export default function PaymentModal({ isOpen, onClose, student, onAddPayment }) {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (isOpen) setAmount('');
  }, [isOpen, student]);

  if (!student) return null;

  const handleAdd = () => {
    const value = Number(amount);
    if (!value || value <= 0) return;
    onAddPayment(student.id, value);
    setAmount('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`To'lovlar — ${student.firstName} ${student.lastName}`}>
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-xl bg-[#f7f8ff] p-4 dark:bg-slate-900/60">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
              Joriy balans
            </p>
            <p className="mt-1 text-2xl font-bold text-[#191b23] dark:text-white">
              {student.balance.toLocaleString('en-US')} so'm
            </p>
          </div>
          <PaymentBadge status={student.paymentStatus} />
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <InputField
              id="payment-amount"
              label="Yangi to'lov summasi"
              type="number"
              placeholder="Masalan, 500000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleAdd}>
            Qo'shish
          </Button>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
            To'lovlar tarixi
          </p>
          <ul className="max-h-64 space-y-2 overflow-y-auto">
            {student.payments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm dark:border-slate-700"
              >
                <span className="text-[#434655] dark:text-slate-300">
                  {new Date(payment.date).toLocaleDateString('uz-UZ')} &bull; {payment.method}
                </span>
                <span className="font-bold text-[#191b23] dark:text-white">
                  {payment.amount.toLocaleString('en-US')} so'm
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Yopish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
