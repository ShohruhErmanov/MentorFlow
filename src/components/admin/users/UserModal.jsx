import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../../ui/Modal';
import FormModal from '../../ui/FormModal';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import Avatar from '../../ui/Avatar';
import RoleBadge from './RoleBadge';
import StatusBadge from './StatusBadge';
import { createUserSchema } from '../../../validation/adminUserSchema';
import { ROLE_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockUsers';

function emptyValues() {
  return {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    role: 'student',
    password: '',
    confirmPassword: '',
    status: 'active',
  };
}

function valuesFromUser(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    role: user.role,
    password: '',
    confirmPassword: '',
    status: user.status,
  };
}

function ViewField({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-[#737686] dark:text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-[#191b23] dark:text-white">{value}</p>
    </div>
  );
}

/**
 * Single modal reused for the create / edit / view flows so field markup
 * only lives in one place. `mode` decides whether it renders an editable
 * FormModal or a read-only profile view.
 */
export default function UserModal({ mode, isOpen, onClose, onSubmit, user, existingUsernames = [] }) {
  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  const schema = useMemo(
    () => createUserSchema(existingUsernames, { requirePassword: mode === 'create' }),
    [existingUsernames, mode],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen || isView) return;
    reset(isEdit && user ? valuesFromUser(user) : emptyValues());
  }, [isOpen, isEdit, user, reset, isView]);

  if (isView) {
    if (!user) return null;

    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Foydalanuvchi profili" className="max-w-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar initials={`${user.firstName[0]}${user.lastName[0]}`} size="lg" />
            <div>
              <p className="text-lg font-bold text-[#191b23] dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ViewField label="Username" value={user.username} />
            <ViewField label="ID" value={user.id} />
            <ViewField label="Email" value={user.email} />
            <ViewField label="Telefon" value={user.phone} />
            <ViewField label="Oxirgi kirish" value={user.lastLoginDisplay} />
            <ViewField label="Ro'yxatdan o'tgan sana" value={new Date(user.createdAt).toLocaleDateString('uz-UZ')} />
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

  const submit = handleSubmit((data) => {
    const { confirmPassword, password, ...rest } = data;
    onSubmit(isEdit && !password ? rest : { ...rest, password });
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Foydalanuvchini tahrirlash' : "Yangi foydalanuvchi qo'shish"}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <InputField
        id="modal-user-firstName"
        label="Ism"
        placeholder="Ism"
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <InputField
        id="modal-user-lastName"
        label="Familiya"
        placeholder="Familiya"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <InputField
        id="modal-user-username"
        label="Username"
        placeholder="username"
        error={errors.username?.message}
        {...register('username')}
      />
      <InputField
        id="modal-user-email"
        label="Email"
        type="email"
        placeholder="email@mentorflow.uz"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        id="modal-user-phone"
        label="Telefon"
        type="tel"
        placeholder="+998 90 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Select id="modal-user-role" label="Rol" options={ROLE_OPTIONS} error={errors.role?.message} {...register('role')} />
      <InputField
        id="modal-user-password"
        label="Parol"
        type="password"
        placeholder={isEdit ? "O'zgartirmaslik uchun bo'sh qoldiring" : 'Kamida 6 ta belgi'}
        error={errors.password?.message}
        {...register('password')}
      />
      <InputField
        id="modal-user-confirmPassword"
        label="Parolni tasdiqlash"
        type="password"
        placeholder="Parolni qayta kiriting"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Select
        id="modal-user-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
    </FormModal>
  );
}
