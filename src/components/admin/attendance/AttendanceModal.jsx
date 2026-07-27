import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarCheck } from 'lucide-react';
import FormModal from '../../ui/FormModal';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';
import Textarea from '../../ui/Textarea';
import StudentMultiSelect from './StudentMultiSelect';
import { markAttendanceSchema, editAttendanceSchema } from '../../../validation/attendanceManagementSchema';
import { COURSE_OPTIONS, GROUP_OPTIONS, MENTOR_OPTIONS, STATUS_OPTIONS } from '../../../constants/mockAttendance';

const courseSelectOptions = COURSE_OPTIONS.map((c) => ({ value: c, label: c }));
const groupSelectOptions = GROUP_OPTIONS.map((g) => ({ value: g.code, label: g.label }));
const mentorSelectOptions = MENTOR_OPTIONS.map((m) => ({ value: m, label: m }));

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function markDefaults(presetStudent) {
  const group = presetStudent ? presetStudent.group : GROUP_OPTIONS[0];
  return {
    date: todayIso(),
    course: group.course,
    group: group.code,
    mentorName: group.mentor,
    studentIds: presetStudent ? [presetStudent.id] : [],
    status: 'present',
    comment: '',
  };
}

function editDefaults(student) {
  return {
    date: todayIso(),
    status: student?.todayStatus ?? 'present',
    comment: '',
  };
}

/**
 * Dual-purpose modal: "mark" bulk-creates attendance for multiple selected
 * students in a group; "edit" updates a single student's record (also
 * reused for the row-menu "Izoh qoldirish" action).
 */
export default function AttendanceModal({ mode = 'mark', isOpen, onClose, onSubmit, student, presetStudent, allStudents = [] }) {
  const isEdit = mode === 'edit';
  const schema = isEdit ? editAttendanceSchema : markAttendanceSchema;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: isEdit ? editDefaults(student) : markDefaults(presetStudent) });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit ? editDefaults(student) : markDefaults(presetStudent));
  }, [isOpen, isEdit, student, presetStudent, reset]);

  const selectedGroup = watch('group');
  const groupStudents = useMemo(
    () => (selectedGroup ? allStudents.filter((s) => s.group.code === selectedGroup) : allStudents),
    [allStudents, selectedGroup],
  );

  const submit = handleSubmit((data) => {
    if (isEdit) {
      onSubmit(student.id, data);
    } else {
      onSubmit(data);
    }
  });

  if (isEdit && !student) return null;

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? `Davomatni tahrirlash — ${student.firstName} ${student.lastName}` : 'Davomat belgilash'}
      subtitle={isEdit ? undefined : "Guruh bo'yicha bir nechta o'quvchi uchun davomat belgilang"}
      icon={CalendarCheck}
      onSubmit={submit}
      isSubmitting={isSubmitting}
    >
      <DatePicker id="attendance-date" label="Sana" error={errors.date?.message} {...register('date')} />
      <Select id="attendance-status" label="Holat" options={STATUS_OPTIONS} error={errors.status?.message} {...register('status')} />

      {!isEdit && (
        <>
          <Select
            id="attendance-course"
            label="Kurs"
            options={courseSelectOptions}
            error={errors.course?.message}
            {...register('course')}
          />
          <Select
            id="attendance-group"
            label="Guruh"
            options={groupSelectOptions}
            error={errors.group?.message}
            {...register('group')}
          />
          <Select
            id="attendance-mentorName"
            label="Mentor"
            options={mentorSelectOptions}
            error={errors.mentorName?.message}
            {...register('mentorName')}
          />

          <div className="sm:col-span-2">
            <Controller
              name="studentIds"
              control={control}
              render={({ field }) => (
                <StudentMultiSelect
                  students={groupStudents}
                  selectedIds={field.value}
                  onChange={field.onChange}
                  error={errors.studentIds?.message}
                />
              )}
            />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <Textarea
          id="attendance-comment"
          label="Izoh (ixtiyoriy)"
          placeholder="Masalan: shifokor ma'lumotnomasi taqdim etilgan"
          error={errors.comment?.message}
          {...register('comment')}
        />
      </div>
    </FormModal>
  );
}
