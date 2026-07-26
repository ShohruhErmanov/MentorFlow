import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import AvatarUploader from '../../profile/AvatarUploader';
import { createMentorSchema } from '../../../validation/mentorSchema';
import { SPECIALIZATION_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockMentors';

const specializationSelectOptions = SPECIALIZATION_OPTIONS.map((option) => ({ value: option, label: option }));

function emptyValues() {
  return {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    specialization: SPECIALIZATION_OPTIONS[0],
    experienceYears: '',
    groups: '',
    bio: '',
    status: 'active',
  };
}

function valuesFromMentor(mentor) {
  return {
    firstName: mentor.firstName,
    lastName: mentor.lastName,
    username: mentor.username,
    email: mentor.email,
    phone: mentor.phone,
    specialization: mentor.specialization,
    experienceYears: mentor.experienceYears,
    groups: mentor.groups.join(', '),
    bio: mentor.bio,
    status: mentor.status,
  };
}

export default function MentorModal({ mode, isOpen, onClose, onSubmit, mentor, existingUsernames = [] }) {
  const isEdit = mode === 'edit';
  const schema = useMemo(() => createMentorSchema(existingUsernames), [existingUsernames]);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && mentor ? valuesFromMentor(mentor) : emptyValues());
    setAvatarUrl(isEdit && mentor ? mentor.avatarUrl : null);
  }, [isOpen, isEdit, mentor, reset]);

  const submit = handleSubmit((data) => {
    const groups = data.groups
      ? data.groups.split(',').map((g) => g.trim()).filter(Boolean)
      : [];

    onSubmit({
      ...data,
      groups,
      avatarUrl: avatarUrl ?? `https://i.pravatar.cc/150?u=${data.username}`,
    });
  });

  const initials = `${(mentor?.firstName ?? 'M')[0]}${(mentor?.lastName ?? 'F')[0]}`;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Mentorni tahrirlash' : "Yangi mentor qo'shish"}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">Rasm</p>
        <AvatarUploader initials={initials} color="#2563eb" onImageChange={setAvatarUrl} />
      </div>

      <InputField id="mentor-firstName" label="Ism" placeholder="Ism" error={errors.firstName?.message} {...register('firstName')} />
      <InputField id="mentor-lastName" label="Familiya" placeholder="Familiya" error={errors.lastName?.message} {...register('lastName')} />
      <InputField id="mentor-username" label="Username" placeholder="username" error={errors.username?.message} {...register('username')} />
      <InputField
        id="mentor-email"
        label="Email"
        type="email"
        placeholder="email@mentorflow.uz"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        id="mentor-phone"
        label="Telefon"
        type="tel"
        placeholder="+998 90 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Select
        id="mentor-specialization"
        label="Mutaxassisligi"
        options={specializationSelectOptions}
        error={errors.specialization?.message}
        {...register('specialization')}
      />
      <InputField
        id="mentor-experienceYears"
        label="Tajriba (yil)"
        type="number"
        placeholder="Masalan, 5"
        error={errors.experienceYears?.message}
        {...register('experienceYears')}
      />
      <InputField
        id="mentor-groups"
        label="Guruhlar"
        placeholder="Masalan, UXD-24, UI-12"
        error={errors.groups?.message}
        {...register('groups')}
      />
      <Select
        id="mentor-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
      <div className="sm:col-span-2">
        <Textarea
          id="mentor-bio"
          label="Bio"
          rows={3}
          placeholder="Mentor haqida qisqacha ma'lumot..."
          error={errors.bio?.message}
          {...register('bio')}
        />
      </div>
    </FormModal>
  );
}
