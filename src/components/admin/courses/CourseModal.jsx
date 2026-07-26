import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import CoverImageUploader from './CoverImageUploader';
import { courseManagementSchema } from '../../../validation/courseManagementSchema';
import { CATEGORY_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockCourses';

const categorySelectOptions = CATEGORY_OPTIONS.map((c) => ({ value: c, label: c }));
const mentorSelectOptions = MENTOR_OPTIONS.map((m) => ({ value: m.name, label: m.name }));

function emptyValues() {
  return {
    name: '',
    category: CATEGORY_OPTIONS[0],
    shortDescription: '',
    fullDescription: '',
    duration: '',
    price: '',
    mentorName: MENTOR_OPTIONS[0].name,
    status: 'active',
  };
}

function valuesFromCourse(course) {
  return {
    name: course.name,
    category: course.category,
    shortDescription: course.shortDescription,
    fullDescription: course.fullDescription,
    duration: course.duration,
    price: course.price,
    mentorName: course.mentor.name,
    status: course.status === 'archived' ? 'inactive' : course.status,
  };
}

export default function CourseModal({ mode, isOpen, onClose, onSubmit, course }) {
  const isEdit = mode === 'edit';
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(courseManagementSchema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && course ? valuesFromCourse(course) : emptyValues());
    setCoverImageUrl(isEdit && course ? course.coverImageUrl : null);
  }, [isOpen, isEdit, course, reset]);

  const submit = handleSubmit((data) => {
    const mentor = MENTOR_OPTIONS.find((m) => m.name === data.mentorName) ?? MENTOR_OPTIONS[0];
    onSubmit({
      ...data,
      mentor,
      coverImageUrl: coverImageUrl ?? `https://picsum.photos/seed/${encodeURIComponent(data.name)}/640/360`,
    });
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Kursni tahrirlash' : "Yangi kurs qo'shish"}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">Muqova rasmi</p>
        <CoverImageUploader initialUrl={isEdit ? course?.coverImageUrl : null} onImageChange={setCoverImageUrl} />
      </div>

      <div className="sm:col-span-2">
        <InputField
          id="course-name"
          label="Kurs nomi"
          placeholder="Masalan, Frontend Development"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      <Select id="course-category" label="Kategoriya" options={categorySelectOptions} error={errors.category?.message} {...register('category')} />
      <Select
        id="course-mentorName"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentorName?.message}
        {...register('mentorName')}
      />
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
        placeholder="Masalan, 1800000"
        error={errors.price?.message}
        {...register('price')}
      />
      <div className="sm:col-span-2">
        <Textarea
          id="course-shortDescription"
          label="Qisqacha tavsif"
          rows={2}
          placeholder="Kurs haqida qisqacha tavsif..."
          error={errors.shortDescription?.message}
          {...register('shortDescription')}
        />
      </div>
      <div className="sm:col-span-2">
        <Textarea
          id="course-fullDescription"
          label="To'liq tavsif"
          rows={4}
          placeholder="Kurs haqida batafsil ma'lumot..."
          error={errors.fullDescription?.message}
          {...register('fullDescription')}
        />
      </div>
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
