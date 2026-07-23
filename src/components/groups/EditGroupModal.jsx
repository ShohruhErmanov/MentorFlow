import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema } from '../../validation/groupsSchema';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export default function EditGroupModal({ isOpen, onClose, onUpdate, group }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(groupSchema),
  });

  useEffect(() => {
    if (group) {
      reset({
        name: group.name,
        course: group.course,
        mentor: group.mentor,
        startDate: group.startDate,
        endDate: group.endDate,
        schedule: group.schedule,
        time: group.time,
        capacity: group.students.max.toString(),
      });
    }
  }, [group, reset]);

  const onSubmit = (data) => {
    onUpdate(data);
  };

  const InputError = ({ message }) => {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-500">{message}</p>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Guruhni tahrirlash">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Same fields as create, ideally we extract this to a shared form component, but keeping it simple for now */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Guruh nomi</label>
          <input
            {...register('name')}
            className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          />
          <InputError message={errors.name?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Kurs</label>
            <select
              {...register('course')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="AI">AI</option>
              <option value="Cyber Security">Cyber Security</option>
            </select>
            <InputError message={errors.course?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Mentor</label>
            <input
              {...register('mentor')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.mentor?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Boshlanish sanasi</label>
            <input
              type="date"
              {...register('startDate')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.startDate?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Tugash sanasi</label>
            <input
              type="date"
              {...register('endDate')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.endDate?.message} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Dars kunlari</label>
            <input
              {...register('schedule')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.schedule?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Dars vaqti</label>
            <input
              {...register('time')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
            />
            <InputError message={errors.time?.message} />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#434655]">Qabul sig'imi</label>
          <input
            type="number"
            {...register('capacity')}
            className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          />
          <InputError message={errors.capacity?.message} />
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed]">
          <Button variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button variant="primary" type="submit">Saqlash</Button>
        </div>
      </form>
    </Modal>
  );
}
