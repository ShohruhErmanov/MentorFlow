import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';
import { mockStudents } from '../../../constants/mockStudents';
import { STUDENT_STATUS_OPTIONS } from '../../../constants/mockGroups';

const schema = z.object({
  studentName: z.string().min(1, "O'quvchini tanlang"),
  startDate: z.string().min(1, 'Boshlanish sanasini kiriting'),
  status: z.enum(['active', 'warned', 'graduated'], { errorMap: () => ({ message: 'Holatni tanlang' }) }),
});

const defaultValues = { studentName: '', startDate: '', status: 'active' };

export default function AddStudentModal({ isOpen, onClose, onSubmit, group, existingNames = [] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset]);

  const availableStudents = useMemo(() => {
    const taken = new Set(existingNames);
    return mockStudents
      .filter((s) => !taken.has(`${s.firstName} ${s.lastName}`))
      .map((s) => ({ value: `${s.firstName} ${s.lastName}`, label: `${s.firstName} ${s.lastName}` }));
  }, [existingNames]);

  if (!group) return null;

  const submit = handleSubmit((data) => onSubmit(data));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="O'quvchi qo'shish"
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <Select
          id="add-student-name"
          label="O'quvchi"
          options={[{ value: '', label: 'Tanlang...' }, ...availableStudents]}
          error={errors.studentName?.message}
          {...register('studentName')}
        />
      </div>
      <InputField id="add-student-group" label="Guruh" value={group.name} disabled readOnly />
      <DatePicker id="add-student-startDate" label="Boshlanish sanasi" error={errors.startDate?.message} {...register('startDate')} />
      <div className="sm:col-span-2">
        <Select
          id="add-student-status"
          label="Holati"
          options={STUDENT_STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />
      </div>
    </FormModal>
  );
}
