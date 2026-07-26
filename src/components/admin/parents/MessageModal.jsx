import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Textarea from '../../ui/Textarea';

const messageSchema = z.object({
  subject: z.string().min(3, "Sarlavha kamida 3 ta belgidan iborat bo'lishi kerak"),
  body: z.string().min(5, "Xabar kamida 5 ta belgidan iborat bo'lishi kerak"),
});

const defaultValues = { subject: '', body: '' };

export default function MessageModal({ isOpen, onClose, onSend, parent }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(messageSchema), defaultValues });

  useEffect(() => {
    if (isOpen) reset(defaultValues);
  }, [isOpen, reset]);

  if (!parent) return null;

  const submit = handleSubmit((data) => onSend(parent, data));

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Xabar yuborish — ${parent.firstName} ${parent.lastName}`}
      onSubmit={submit}
      isSubmitting={isSubmitting}
      submitLabel="Yuborish"
      submittingLabel="Yuborilmoqda..."
    >
      <div className="sm:col-span-2">
        <InputField
          id="message-subject"
          label="Sarlavha"
          placeholder="Xabar sarlavhasi"
          error={errors.subject?.message}
          {...register('subject')}
        />
      </div>
      <div className="sm:col-span-2">
        <Textarea
          id="message-body"
          label="Xabar"
          rows={5}
          placeholder="Xabar matnini kiriting..."
          error={errors.body?.message}
          {...register('body')}
        />
      </div>
    </FormModal>
  );
}
