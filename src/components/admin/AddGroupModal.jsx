import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../ui/FormModal';
import InputField from '../ui/InputField';
import Select from '../ui/Select';
import DatePicker from '../ui/DatePicker';
import { adminGroupSchema } from '../../validation/adminGroupSchema';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
];

const defaultValues = {
  name: '',
  mentor: '',
  course: '',
  startDate: '',
  endDate: '',
  capacity: '',
  status: 'active',
};

export default function AddGroupModal({ isOpen, onClose, onCreate, mentorOptions, courseOptions }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(adminGroupSchema), defaultValues });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset]);

  const mentorSelectOptions = useMemo(
    () => [{ value: '', label: 'Tanlang...' }, ...mentorOptions.map((name) => ({ value: name, label: name }))],
    [mentorOptions],
  );
  const courseSelectOptions = useMemo(
    () => [{ value: '', label: 'Tanlang...' }, ...courseOptions.map((name) => ({ value: name, label: name }))],
    [courseOptions],
  );

  const submit = handleSubmit((data) => onCreate(data));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi guruh qo'shish"
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <InputField
          id="group-name"
          label="Guruh nomi"
          placeholder="Masalan, Frontend N5"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      <Select
        id="group-mentor"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentor?.message}
        {...register('mentor')}
      />
      <Select
        id="group-course"
        label="Kurs"
        options={courseSelectOptions}
        error={errors.course?.message}
        {...register('course')}
      />
      <DatePicker id="group-startDate" label="Boshlanish sanasi" error={errors.startDate?.message} {...register('startDate')} />
      <DatePicker id="group-endDate" label="Tugash sanasi" error={errors.endDate?.message} {...register('endDate')} />
      <InputField
        id="group-capacity"
        label="Maksimal o'quvchilar soni"
        type="number"
        placeholder="25"
        error={errors.capacity?.message}
        {...register('capacity')}
      />
      <Select
        id="group-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
    </FormModal>
  );
}
