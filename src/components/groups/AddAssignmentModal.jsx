import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema } from '../../validation/groupsSchema';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';
import FileDropzone from '../ui/FileDropzone';

export default function AddAssignmentModal({ isOpen, onClose, onCreate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: '',
      description: '',
      course: '',
      deadline: '',
      maxScore: '',
      priority: 'Medium',
      difficulty: 'Medium',
    }
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      onCreate({
        ...data,
        fileName: attachedFile ? attachedFile.name : null,
      });
      setIsSubmitting(false);
      reset();
      setAttachedFile(null);
    }, 600); // Simulate API call
  };

  const InputError = ({ message }) => {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-500">{message}</p>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vazifa qo'shish">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 scrollbar-hide">
        
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Vazifa nomi</label>
          <input
            {...register('title')}
            placeholder="Masalan, React Hooks amaliyoti"
            className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          />
          <InputError message={errors.title?.message} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Tavsif (Description)</label>
          <textarea
            {...register('description')}
            rows={3}
            placeholder="Vazifa bo'yicha qo'shimcha ma'lumot va ko'rsatmalar..."
            className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] resize-none"
          />
          <InputError message={errors.description?.message} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Kurs</label>
            <select
              {...register('course')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            >
              <option value="">Tanlang...</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="AI">AI</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
            <InputError message={errors.course?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Muddat (Deadline)</label>
            <input
              type="date"
              {...register('deadline')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.deadline?.message} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Maksimal ball</label>
            <input
              type="number"
              {...register('maxScore')}
              placeholder="100"
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.maxScore?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Muhimlik (Priority)</label>
            <select
              {...register('priority')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            >
              <option value="Low">Low (Past)</option>
              <option value="Medium">Medium (O'rta)</option>
              <option value="High">High (Yuqori)</option>
            </select>
            <InputError message={errors.priority?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Qiyinlik (Difficulty)</label>
            <select
              {...register('difficulty')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <InputError message={errors.difficulty?.message} />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Fayl biriktirish (UI Only)</label>
          <FileDropzone onFileSelect={setAttachedFile} accept=".pdf, .docx, .zip" />
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed] sticky bottom-0 bg-white">
          <Button variant="ghost" type="button" onClick={onClose} disabled={isSubmitting}>Bekor qilish</Button>
          <LoadingButton variant="primary" type="submit" isLoading={isSubmitting} loadingText="Yaratilmoqda...">
            Yaratish
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
