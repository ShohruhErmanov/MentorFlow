import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema } from '../../validation/groupsSchema';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import LoadingButton from '../ui/LoadingButton';
import Checkbox from '../ui/Checkbox';

const WEEKDAYS = [
  { id: 'Dushanba', label: 'Dushanba' },
  { id: 'Seshanba', label: 'Seshanba' },
  { id: 'Chorshanba', label: 'Chorshanba' },
  { id: 'Payshanba', label: 'Payshanba' },
  { id: 'Juma', label: 'Juma' },
  { id: 'Shanba', label: 'Shanba' },
  { id: 'Yakshanba', label: 'Yakshanba' },
];

export default function EditGroupModal({ isOpen, onClose, onUpdate, group }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: '',
      course: '',
      mentor: '',
      startDate: '',
      endDate: '',
      weekdays: [],
      startTime: '',
      endTime: '',
      capacity: '',
      description: '',
      status: 'Faol',
    }
  });

  useEffect(() => {
    if (group && isOpen) {
      // Parse schedule and time from existing group format for backward compatibility
      let parsedWeekdays = [];
      if (group.schedule) {
        parsedWeekdays = WEEKDAYS.filter(d => group.schedule.includes(d.id.substring(0, 4))).map(d => d.id);
      }
      
      let parsedStartTime = '';
      let parsedEndTime = '';
      if (group.time) {
        const parts = group.time.split(' - ');
        if (parts.length === 2) {
          parsedStartTime = parts[0];
          parsedEndTime = parts[1];
        }
      }

      reset({
        name: group.name || '',
        course: group.course || '',
        mentor: group.mentor || '',
        startDate: group.startDate || '',
        endDate: group.endDate || '',
        weekdays: parsedWeekdays.length > 0 ? parsedWeekdays : ['Dushanba', 'Chorshanba', 'Juma'],
        startTime: parsedStartTime || '15:00',
        endTime: parsedEndTime || '17:00',
        capacity: group.students?.max?.toString() || '25',
        description: group.description || '',
        status: group.status || 'Faol',
      });
    }
  }, [group, isOpen, reset]);

  const selectedWeekdays = watch('weekdays');

  const handleWeekdayToggle = (dayId) => {
    if (selectedWeekdays.includes(dayId)) {
      setValue('weekdays', selectedWeekdays.filter(d => d !== dayId), { shouldValidate: true });
    } else {
      setValue('weekdays', [...selectedWeekdays, dayId], { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const formattedData = {
      ...data,
      schedule: data.weekdays.map(d => d.substring(0, 4)).join(', '),
      time: `${data.startTime} - ${data.endTime}`
    };

    setTimeout(() => {
      onUpdate(formattedData);
      setIsSubmitting(false);
    }, 600);
  };

  const InputError = ({ message }) => {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-500">{message}</p>;
  };

  if (!group) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Guruhni tahrirlash">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 scrollbar-hide">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Guruh nomi</label>
            <input
              {...register('name')}
              placeholder="Masalan, Frontend N1"
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.name?.message} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Kurs</label>
            <select
              {...register('course')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
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
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Mentor</label>
            <input
              {...register('mentor')}
              placeholder="Mentor ism-sharifi"
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.mentor?.message} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Boshlanish sanasi</label>
            <input
              type="date"
              {...register('startDate')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.startDate?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Tugash sanasi</label>
            <input
              type="date"
              {...register('endDate')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.endDate?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[#434655] dark:text-slate-400">Hafta kunlari</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {WEEKDAYS.map((day) => (
                <Checkbox
                  key={day.id}
                  id={`edit-${day.id}`}
                  label={day.label}
                  checked={selectedWeekdays.includes(day.id)}
                  onChange={() => handleWeekdayToggle(day.id)}
                />
              ))}
            </div>
            <InputError message={errors.weekdays?.message} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Boshlanish vaqti</label>
            <input
              type="time"
              {...register('startTime')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.startTime?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Tugash vaqti</label>
            <input
              type="time"
              {...register('endTime')}
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.endTime?.message} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">O'quvchilar soni (Max)</label>
            <input
              type="number"
              {...register('capacity')}
              placeholder="Masalan, 25"
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
            <InputError message={errors.capacity?.message} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Status</label>
            <select
              {...register('status')}
              className="w-full rounded-lg border border-[#e1e2ed] bg-white px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="Faol">Faol</option>
              <option value="Yakunlangan">Yakunlangan</option>
              <option value="Arxiv">Arxiv</option>
            </select>
            <InputError message={errors.status?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-[#434655] dark:text-slate-400">Qo'shimcha ma'lumot (Ixtiyoriy)</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Guruh haqida qo'shimcha ma'lumot kiriting..."
              className="w-full rounded-lg border border-[#e1e2ed] px-3 py-2 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 resize-none"
            />
            <InputError message={errors.description?.message} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#e1e2ed] sticky bottom-0 bg-white dark:border-slate-700 dark:bg-slate-800">
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>Bekor qilish</Button>
          <LoadingButton variant="primary" type="submit" isLoading={isSubmitting} loadingText="Saqlanmoqda...">
            Saqlash
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
}
