import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Shield } from 'lucide-react';
import AvatarUploader from './AvatarUploader';
import Toast from '../ui/Toast';
import LoadingButton from '../ui/LoadingButton';

function FormField({ id, label, value, onChange, type = 'text', error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={[
          'h-[48px] w-full rounded-xl border bg-white px-4 text-sm text-[#191b23] outline-none transition-all duration-200',
          'placeholder:text-gray-400',
          'focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]',
          'dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500',
          error
            ? 'border-red-400 ring-2 ring-red-400/15'
            : 'border-[#e1e2ed] hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500',
        ].join(' ')}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^\+?[0-9\s\-()]{9,15}$/.test(phone);
}

export default function ProfileCard({ user }) {
  const [form, setForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Ism kiritilishi shart";
    if (!form.lastName.trim()) errs.lastName = "Familiya kiritilishi shart";
    if (!validateEmail(form.email)) errs.email = "Email noto'g'ri formatda";
    if (!validatePhone(form.phone)) errs.phone = "Telefon raqami noto'g'ri";
    return errs;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast({ visible: true, message: "Ma'lumotlar muvaffaqiyatli saqlandi!" });
    }, 1200);
  };

  const isValid = !Object.values(errors).some(Boolean);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        {/* Card Header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
            <Lock size={16} className="text-[#2563eb] dark:text-blue-400" />
          </div>
          <h2 className="text-base font-bold text-[#191b23] dark:text-white">Shaxsiy ma'lumotlar</h2>
        </div>

        <form onSubmit={handleSave} noValidate>
          {/* Avatar */}
          <div className="mb-6">
            <AvatarUploader
              initials={user.avatarInitials}
              color={user.avatarColor}
            />
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <FormField
              id="firstName"
              label="ISM"
              value={form.firstName}
              onChange={handleChange('firstName')}
              error={errors.firstName}
            />
            <FormField
              id="lastName"
              label="FAMILIYA"
              value={form.lastName}
              onChange={handleChange('lastName')}
              error={errors.lastName}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <FormField
              id="email"
              label="ELEKTRON POCHTA"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <FormField
              id="phone"
              label="TELEFON RAQAM"
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <LoadingButton
              type="submit"
              isLoading={loading}
              loadingText="Saqlanmoqda..."
              disabled={!isValid}
              className="px-8"
            >
              Saqlash
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
