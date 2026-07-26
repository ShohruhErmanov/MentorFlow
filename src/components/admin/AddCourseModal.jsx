import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../ui/FormModal';
import InputField from '../ui/InputField';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import { adminCourseSchema } from '../../validation/adminCourseSchema';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Faol' },
  { value: 'inactive', label: 'Nofaol' },
];

const defaultValues = {
  name: '',
  description: '',
  duration: '',
  price: '',
  mentor: '',
  status: 'active',
};

export default function AddCourseModal({ isOpen, onClose, onCreate, mentorOptions }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(adminCourseSchema), defaultValues });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset]);

  const mentorSelectOptions = useMemo(
    () => [{ value: '', label: 'Tanlang...' }, ...mentorOptions.map((name) => ({ value: name, label: name }))],
    [mentorOptions],
  );

  const submit = handleSubmit((data) => onCreate(data));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi kurs qo'shish"
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <InputField
          id="course-name"
          label="Kurs nomi"
          placeholder="Masalan, Frontend React"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      <div className="sm:col-span-2">
        <Textarea
          id="course-description"
          label="Tavsif"
          rows={3}
          placeholder="Kurs haqida qisqacha tavsif..."
          error={errors.description?.message}
          {...register('description')}
        />
      </div>
      <InputField
        id="course-duration"
        label="Davomiyligi"
        placeholder="Masalan, 6 oy"
        error={errors.duration?.message}
        {...register('duration')}
      />
      <InputField
        id="course-price"
        label="Narxi"
        type="number"
        placeholder="Masalan, 900000"
        error={errors.price?.message}
        {...register('price')}
      />
      <Select
        id="course-mentor"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentor?.message}
        {...register('mentor')}
      />
      <Select
        id="course-status"
        label="Holati"
        options={STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />
    </FormModal>
  );
}
