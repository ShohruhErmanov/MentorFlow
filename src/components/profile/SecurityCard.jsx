import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Smartphone } from 'lucide-react';
import PasswordField from './PasswordField';
import LoadingButton from '../ui/LoadingButton';
import Toast from '../ui/Toast';

function TwoFAToggle({ enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#e1e2ed] bg-[#f8fafc] p-4 dark:border-slate-600 dark:bg-slate-700">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
          <Smartphone size={18} className="text-[#2563eb] dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#191b23] dark:text-white">Ikki bosqichli autentifikatsiya</p>
          <p className="text-xs text-[#737686] dark:text-slate-400">Qo'shimcha xavfsizlik uchun yoqing</p>
        </div>
      </div>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40',
          enabled ? 'bg-[#2563eb]' : 'bg-gray-200 dark:bg-slate-600',
        ].join(' ')}
        aria-label="2FA toggle"
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className={[
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md',
            enabled ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function SecurityCard() {
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [twoFA, setTwoFA] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleChange = (field) => (e) =>
    setPasswords((p) => ({ ...p, [field]: e.target.value }));

  const mismatch =
    passwords.newPass.length > 0 &&
    passwords.confirm.length > 0 &&
    passwords.newPass !== passwords.confirm;

  const tooShort =
    passwords.newPass.length > 0 && passwords.newPass.length < 8;

  const canSubmit =
    passwords.current.length > 0 &&
    passwords.newPass.length >= 8 &&
    passwords.newPass === passwords.confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPasswords({ current: '', newPass: '', confirm: '' });
      setToast({ visible: true, message: 'Parol muvaffaqiyatli yangilandi!' });
    }, 1400);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <ShieldCheck size={16} className="text-[#2563eb] dark:text-blue-400" />
          </div>
          <h2 className="text-base font-bold text-[#191b23] dark:text-white">Xavfsizlik</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Current Password */}
          <PasswordField
            id="current-password"
            label="JORIY PAROL"
            placeholder="••••••••"
            value={passwords.current}
            onChange={handleChange('current')}
          />

          {/* New + Confirm row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PasswordField
              id="new-password"
              label="YANGI PAROL"
              placeholder="Yangi parolni kiriting"
              value={passwords.newPass}
              onChange={handleChange('newPass')}
              error={tooShort ? 'Kamida 8 ta belgi' : undefined}
            />
            <PasswordField
              id="confirm-password"
              label="PAROLNI TASDIQLANG"
              placeholder="Yangi parolni takrorlang"
              value={passwords.confirm}
              onChange={handleChange('confirm')}
              error={mismatch ? 'Parollar mos kelmadi' : undefined}
            />
          </div>

          {/* 2FA */}
          <div className="pt-2">
            <TwoFAToggle enabled={twoFA} onToggle={() => setTwoFA((v) => !v)} />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <LoadingButton
              type="submit"
              isLoading={loading}
              loadingText="Yangilanmoqda..."
              disabled={!canSubmit}
              variant="primary"
              className="px-8"
            >
              Parolni yangilash
            </LoadingButton>
          </div>
        </form>
      </motion.div>

      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={() => setToast({ visible: false, message: '' })}
      />
    </>
  );
}
