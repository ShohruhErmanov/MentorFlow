import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import AvatarUploader from '../../profile/AvatarUploader';
import { createParentSchema } from '../../../validation/parentSchema';
import { GROUP_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockParents';

const groupSelectOptions = GROUP_OPTIONS.map((g) => ({ value: g, label: g }));
const mentorSelectOptions = MENTOR_OPTIONS.map((m) => ({ value: m, label: m }));

function emptyValues() {
  return {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    address: '',
    childrenNames: '',
    mentorName: MENTOR_OPTIONS[0],
    group: GROUP_OPTIONS[0],
    status: 'active',
    password: '',
    confirmPassword: '',
  };
}

function valuesFromParent(parent) {
  return {
    firstName: parent.firstName,
    lastName: parent.lastName,
    username: parent.username,
    email: parent.email,
    phone: parent.phone,
    address: parent.address,
    childrenNames: parent.children.map((c) => c.name).join(', '),
    mentorName: parent.children[0]?.mentor ?? MENTOR_OPTIONS[0],
    group: parent.children[0]?.group ?? GROUP_OPTIONS[0],
    status: parent.status,
    password: '',
    confirmPassword: '',
  };
}

export default function ParentModal({ mode, isOpen, onClose, onSubmit, parent, existingUsernames = [] }) {
  const isEdit = mode === 'edit';
  const schema = useMemo(
    () => createParentSchema(existingUsernames, { requirePassword: mode === 'create' }),
    [existingUsernames, mode],
  );
  const [avatarUrl, setAvatarUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && parent ? valuesFromParent(parent) : emptyValues());
    setAvatarUrl(isEdit && parent ? parent.avatarUrl : null);
  }, [isOpen, isEdit, parent, reset]);

  const submit = handleSubmit((data) => {
    const { confirmPassword, password, childrenNames, mentorName, group, ...rest } = data;
    const children = childrenNames
      .split(',')
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        group,
        mentor: mentorName,
        attendance: 0,
        totalPaid: 0,
        assignmentsCompleted: 0,
        assignmentsTotal: 0,
      }));

    onSubmit({
      ...rest,
      children,
      avatarUrl: avatarUrl ?? undefined,
      ...(isEdit && !password ? {} : { password }),
    });
  });

  const initials = `${(parent?.firstName ?? 'O')[0]}${(parent?.lastName ?? 'O')[0]}`;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Ota-onani tahrirlash" : 'Yangi ota-ona qo\'shish'}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">Rasm</p>
        <AvatarUploader initials={initials} color="#2563eb" onImageChange={setAvatarUrl} />
      </div>

      <InputField id="parent-firstName" label="Ism" placeholder="Ism" error={errors.firstName?.message} {...register('firstName')} />
      <InputField id="parent-lastName" label="Familiya" placeholder="Familiya" error={errors.lastName?.message} {...register('lastName')} />
      <InputField id="parent-username" label="Username" placeholder="username" error={errors.username?.message} {...register('username')} />
      <InputField
        id="parent-email"
        label="Email"
        type="email"
        placeholder="email@mentorflow.uz"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        id="parent-phone"
        label="Telefon"
        type="tel"
        placeholder="+998 90 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <InputField
        id="parent-address"
        label="Manzil"
        placeholder="Shahar, tuman"
        error={errors.address?.message}
        {...register('address')}
      />
      <div className="sm:col-span-2">
        <InputField
          id="parent-childrenNames"
          label="Farzand(lar)"
          placeholder="Masalan, Azizbek Rahimov, Nargiza Qodirova"
          error={errors.childrenNames?.message}
          {...register('childrenNames')}
        />
      </div>
      <Select
        id="parent-mentorName"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentorName?.message}
        {...register('mentorName')}
      />
      <Select
        id="parent-group"
        label="Guruh"
        options={groupSelectOptions}
        error={errors.group?.message}
        {...register('group')}
      />
      <Select
        id="parent-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
      <InputField
        id="parent-password"
        label="Parol"
        type="password"
        placeholder={isEdit ? "O'zgartirmaslik uchun bo'sh qoldiring" : 'Kamida 6 ta belgi'}
        error={errors.password?.message}
        {...register('password')}
      />
      <InputField
        id="parent-confirmPassword"
        label="Parolni tasdiqlash"
        type="password"
        placeholder="Parolni qayta kiriting"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
    </FormModal>
  );
}
