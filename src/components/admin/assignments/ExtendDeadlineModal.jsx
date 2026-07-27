import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormModal from '../../ui/FormModal';
import DatePicker from '../../ui/DatePicker';

const schema = z.object({
  deadline: z.string().min(1, 'Yangi muddatni tanlang'),
});

export default function ExtendDeadlineModal({ isOpen, onClose, onSubmit, assignment }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { deadline: '' } });

  useEffect(() => {
    if (isOpen && assignment) {
      reset({ deadline: assignment.deadline.slice(0, 10) });
    }
  }, [isOpen, assignment, reset]);

  if (!assignment) return null;

  const submit = handleSubmit((data) => onSubmit(assignment.id, data.deadline));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Muddatni uzaytirish — ${assignment.title}`}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <DatePicker id="extend-deadline" label="Yangi topshirish muddati" error={errors.deadline?.message} {...register('deadline')} />
      </div>
    </FormModal>
  );
}
