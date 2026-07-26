import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../ui/FormModal';
import InputField from '../ui/InputField';
import Select from '../ui/Select';
import { createUserSchema } from '../../validation/adminUserSchema';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'mentor', label: 'Mentor' },
  { value: 'student', label: "O'quvchi" },
  { value: 'parent', label: 'Ota-ona' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
];

const defaultValues = {
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

export default function AddUserModal({ isOpen, onClose, onCreate, existingUsernames }) {
  const schema = useMemo(() => createUserSchema(existingUsernames), [existingUsernames]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset]);

  const submit = handleSubmit((data) => {
    const { confirmPassword, ...user } = data;
    onCreate(user);
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi foydalanuvchi qo'shish"
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <InputField
        id="user-firstName"
        label="Ism"
        placeholder="Ism"
        error={errors.firstName?.message}
        {...register('firstName')}
      />
      <InputField
        id="user-lastName"
        label="Familiya"
        placeholder="Familiya"
        error={errors.lastName?.message}
        {...register('lastName')}
      />
      <InputField
        id="user-username"
        label="Username"
        placeholder="username"
        error={errors.username?.message}
        {...register('username')}
      />
      <InputField
        id="user-email"
        label="Email"
        type="email"
        placeholder="email@mentorflow.uz"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        id="user-phone"
        label="Telefon"
        type="tel"
        placeholder="+998 90 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Select id="user-role" label="Rol" options={ROLE_OPTIONS} error={errors.role?.message} {...register('role')} />
      <InputField
        id="user-password"
        label="Parol"
        type="password"
        placeholder="Kamida 6 ta belgi"
        error={errors.password?.message}
        {...register('password')}
      />
      <InputField
        id="user-confirmPassword"
        label="Parolni tasdiqlash"
        type="password"
        placeholder="Parolni qayta kiriting"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <Select
        id="user-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
    </FormModal>
  );
}
