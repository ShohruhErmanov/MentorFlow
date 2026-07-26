import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormModal from '../../ui/FormModal';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';
import Checkbox from '../../ui/Checkbox';
import { groupManagementSchema } from '../../../validation/groupManagementSchema';
import { COURSE_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS, WEEKDAYS } from '../../../constants/mockGroups';

const courseSelectOptions = COURSE_OPTIONS.map((c) => ({ value: c, label: c }));
const mentorSelectOptions = MENTOR_OPTIONS.map((m) => ({ value: m.name, label: m.name }));

function toDateInputValue(iso) {
  return iso ? iso.slice(0, 10) : '';
}

function emptyValues() {
  return {
    name: '',
    course: COURSE_OPTIONS[0],
    mentorName: MENTOR_OPTIONS[0].name,
    startDate: '',
    endDate: '',
    weekdays: [],
    startTime: '',
    endTime: '',
    capacity: '',
    room: '',
    status: 'active',
  };
}

function valuesFromGroup(group) {
  const [startTime, endTime] = group.scheduleTime.split(' - ');
  return {
    name: group.name,
    course: group.course,
    mentorName: group.mentor.name,
    startDate: toDateInputValue(group.startDate),
    endDate: toDateInputValue(group.endDate),
    weekdays: [],
    startTime: startTime ?? '',
    endTime: endTime ?? '',
    capacity: group.capacity,
    room: group.room,
    status: group.status === 'archived' ? 'inactive' : group.status,
  };
}

export default function GroupModal({ mode, isOpen, onClose, onSubmit, group }) {
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(groupManagementSchema), defaultValues: emptyValues() });

  const selectedWeekdays = watch('weekdays');

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && group ? valuesFromGroup(group) : emptyValues());
  }, [isOpen, isEdit, group, reset]);

  const handleWeekdayToggle = (dayId) => {
    if (selectedWeekdays.includes(dayId)) {
      setValue('weekdays', selectedWeekdays.filter((d) => d !== dayId), { shouldValidate: true });
    } else {
      setValue('weekdays', [...selectedWeekdays, dayId], { shouldValidate: true });
    }
  };

  const submit = handleSubmit((data) => {
    const mentor = MENTOR_OPTIONS.find((m) => m.name === data.mentorName) ?? MENTOR_OPTIONS[0];
    onSubmit({
      ...data,
      mentor,
      scheduleDays: data.weekdays.map((d) => d.substring(0, 2)),
      scheduleTime: `${data.startTime} - ${data.endTime}`,
    });
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Guruhni tahrirlash' : "Yangi guruh qo'shish"}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <div className="sm:col-span-2">
        <InputField
          id="group-name"
          label="Guruh nomi"
          placeholder="Masalan, Frontend N-24"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      <Select id="group-course" label="Kurs" options={courseSelectOptions} error={errors.course?.message} {...register('course')} />
      <Select
        id="group-mentorName"
        label="Mentor"
        options={mentorSelectOptions}
        error={errors.mentorName?.message}
        {...register('mentorName')}
      />
      <DatePicker id="group-startDate" label="Boshlanish sanasi" error={errors.startDate?.message} {...register('startDate')} />
      <DatePicker id="group-endDate" label="Tugash sanasi" error={errors.endDate?.message} {...register('endDate')} />

      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">Dars kunlari</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WEEKDAYS.map((day) => (
            <Checkbox
              key={day.id}
              id={`group-day-${day.id}`}
              label={day.label}
              checked={selectedWeekdays.includes(day.id)}
              onChange={() => handleWeekdayToggle(day.id)}
            />
          ))}
        </div>
        {errors.weekdays?.message && (
          <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.weekdays.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#191b23] dark:text-slate-200">Dars boshlanish vaqti</label>
        <input
          type="time"
          {...register('startTime')}
          className="w-full rounded-xl border border-[#e1e2ed] bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        {errors.startTime?.message && (
          <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.startTime.message}</p>
        )}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#191b23] dark:text-slate-200">Dars tugash vaqti</label>
        <input
          type="time"
          {...register('endTime')}
          className="w-full rounded-xl border border-[#e1e2ed] bg-white px-4 py-3 text-sm outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        {errors.endTime?.message && (
          <p className="mt-1.5 text-xs font-medium text-red-500 dark:text-red-400">{errors.endTime.message}</p>
        )}
      </div>

      <InputField
        id="group-capacity"
        label="Maksimal o'quvchilar"
        type="number"
        placeholder="Masalan, 20"
        error={errors.capacity?.message}
        {...register('capacity')}
      />
      <InputField
        id="group-room"
        label="Xona"
        placeholder="Masalan, A-204"
        error={errors.room?.message}
        {...register('room')}
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
