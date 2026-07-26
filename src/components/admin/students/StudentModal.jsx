import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';
import AvatarUploader from '../../profile/AvatarUploader';
import { createStudentSchema } from '../../../validation/studentSchema';
import { GENDER_OPTIONS, GROUP_OPTIONS, MENTOR_OPTIONS, PAYMENT_STATUS_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockStudents';

const groupSelectOptions = GROUP_OPTIONS.map((g) => ({ value: g, label: g }));
const mentorSelectOptions = MENTOR_OPTIONS.map((m) => ({ value: m, label: m }));

function emptyValues() {
  return {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: 'male',
    mentorName: MENTOR_OPTIONS[0],
    group: GROUP_OPTIONS[0],
    parentName: '',
    paymentStatus: 'pending',
    status: 'active',
  };
}

function valuesFromStudent(student) {
  return {
    firstName: student.firstName,
    lastName: student.lastName,
    username: student.username,
    email: student.email,
    phone: student.phone,
    birthDate: student.birthDate,
    gender: student.gender,
    mentorName: student.mentorName,
    group: student.group,
    parentName: student.parentName,
    paymentStatus: student.paymentStatus,
    status: student.status,
  };
}

export default function StudentModal({ mode, isOpen, onClose, onSubmit, student, existingUsernames = [] }) {
  const isEdit = mode === 'edit';
  const schema = useMemo(() => createStudentSchema(existingUsernames), [existingUsernames]);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && student ? valuesFromStudent(student) : emptyValues());
    setAvatarUrl(isEdit && student ? student.avatarUrl : null);
  }, [isOpen, isEdit, student, reset]);

  const submit = handleSubmit((data) => {
    onSubmit({
      ...data,
      avatarUrl: avatarUrl ?? `https://i.pravatar.cc/150?u=${data.username}`,
    });
  });

  const initials = `${(student?.firstName ?? 'O')[0]}${(student?.lastName ?? "Q")[0]}`;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "O'quvchini tahrirlash" : "Yangi o'quvchi qo'shish"}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">Rasm</p>
        <AvatarUploader initials={initials} color="#2563eb" onImageChange={setAvatarUrl} />
      </div>

      <InputField id="student-firstName" label="Ism" placeholder="Ism" error={errors.firstName?.message} {...register('firstName')} />
      <InputField id="student-lastName" label="Familiya" placeholder="Familiya" error={errors.lastName?.message} {...register('lastName')} />
      <InputField id="student-username" label="Username" placeholder="username" error={errors.username?.message} {...register('username')} />
      <InputField
        id="student-email"
        label="Email"
        type="email"
        placeholder="email@mentorflow.uz"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        id="student-phone"
        label="Telefon"
        type="tel"
        placeholder="+998 90 123 45 67"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <DatePicker id="student-birthDate" label="Tug'ilgan sana" error={errors.birthDate?.message} {...register('birthDate')} />
      <Select id="student-gender" label="Jinsi" options={GENDER_OPTIONS} error={errors.gender?.message} {...register('gender')} />
      <Select
        id="student-mentorName"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentorName?.message}
        {...register('mentorName')}
      />
      <Select
        id="student-group"
        label="Guruh"
        options={groupSelectOptions}
        error={errors.group?.message}
        {...register('group')}
      />
      <InputField
        id="student-parentName"
        label="Ota-ona"
        placeholder="Ota-ona F.I.Sh."
        error={errors.parentName?.message}
        {...register('parentName')}
      />
      <Select
        id="student-paymentStatus"
        label="To'lov holati"
        options={PAYMENT_STATUS_OPTIONS}
        error={errors.paymentStatus?.message}
        {...register('paymentStatus')}
      />
      <Select
        id="student-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
    </FormModal>
  );
}
