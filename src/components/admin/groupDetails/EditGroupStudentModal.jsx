import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import { STUDENT_STATUS_OPTIONS } from '../../../constants/mockGroups';

const schema = z.object({
  attendance: z.coerce.number().min(0, 'Manfiy bo\'lishi mumkin emas').max(100, 'Maksimal 100%'),
  score: z.coerce.number().min(0, 'Manfiy bo\'lishi mumkin emas').max(100, 'Maksimal 100'),
  status: z.enum(['active', 'warned', 'graduated'], { errorMap: () => ({ message: 'Holatni tanlang' }) }),
});

export default function EditGroupStudentModal({ isOpen, onClose, onSubmit, student }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { attendance: 0, score: 0, status: 'active' } });

  useEffect(() => {
    if (isOpen && student) {
      reset({ attendance: student.attendance, score: student.score, status: student.status });
    }
  }, [isOpen, student, reset]);

  if (!student) return null;

  const submit = handleSubmit((data) => onSubmit(student.id, data));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Tahrirlash — ${student.name}`}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <InputField
        id="edit-student-attendance"
        label="Davomat (%)"
        type="number"
        error={errors.attendance?.message}
        {...register('attendance')}
      />
      <InputField
        id="edit-student-score"
        label="O'rtacha baho"
        type="number"
        error={errors.score?.message}
        {...register('score')}
      />
      <div className="sm:col-span-2">
        <Select
          id="edit-student-status"
          label="Holati"
          options={STUDENT_STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />
      </div>
    </FormModal>
  );
}
