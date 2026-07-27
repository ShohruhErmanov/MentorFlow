import { FileText, Github, Figma as FigmaIcon, Video } from 'lucide-react';
import InputField from '../../ui/InputField';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import FormField from '../../ui/FormField';
import DateTimeField from '../../ui/DateTimeField';
import UploadCard from '../../ui/UploadCard';
import { COURSE_OPTIONS, GROUP_OPTIONS, MENTOR_OPTIONS } from '../../../constants/mockAssignments';

const courseSelectOptions = [{ value: '', label: 'Kursni tanlang' }, ...COURSE_OPTIONS.map((c) => ({ value: c, label: c }))];
const groupSelectOptions = [{ value: '', label: 'Guruhni tanlang' }, ...GROUP_OPTIONS.map((g) => ({ value: g, label: g }))];
const mentorSelectOptions = [
  { value: '', label: 'Mentorni tanlang' },
  ...MENTOR_OPTIONS.map((m) => ({ value: m.name, label: m.name })),
];

/**
 * Pure field-layout component for the create/edit assignment form —
 * reused by AssignmentModal for both modes. All state (react-hook-form
 * register/errors, plus the attachments map which isn't a native form
 * input) lives in the caller.
 */
export default function AssignmentForm({ register, errors, attachments, onAttachmentChange }) {
  return (
    <>
      <div className="sm:col-span-2">
        <InputField
          id="assignment-title"
          label="Vazifa nomi"
          placeholder="Masalan: Figma Auto Layout mashqlari"
          error={errors.title?.message}
          {...register('title')}
        />
      </div>

      <div className="sm:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select id="assignment-course" label="Kurs" options={courseSelectOptions} error={errors.course?.message} {...register('course')} />
        <Select id="assignment-group" label="Guruh" options={groupSelectOptions} error={errors.group?.message} {...register('group')} />
        <Select
          id="assignment-mentorName"
          label="Mentor"
          options={mentorSelectOptions}
          error={errors.mentorName?.message}
          {...register('mentorName')}
        />
      </div>

      <Textarea
        id="assignment-shortDescription"
        label="Tavsif"
        rows={4}
        placeholder="Vazifa haqida umumiy ma'lumot..."
        error={errors.shortDescription?.message}
        {...register('shortDescription')}
      />
      <Textarea
        id="assignment-requirements"
        label="Talablar"
        rows={4}
        placeholder="O'quvchi bajarishi shart bo'lgan talablar..."
        error={errors.requirements?.message}
        {...register('requirements')}
      />

      <FormField id="assignment-maxScore" label="Maksimal ball" error={errors.maxScore?.message}>
        <div className="relative">
          <input
            id="assignment-maxScore"
            type="number"
            min="1"
            placeholder="100"
            aria-invalid={Boolean(errors.maxScore)}
            {...register('maxScore')}
            className="w-full rounded-xl border border-[#e1e2ed] bg-white py-3 pl-4 pr-12 text-sm text-[#191b23] outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#737686] dark:text-slate-400">
            ball
          </span>
        </div>
      </FormField>

      <DateTimeField
        id="assignment-deadline"
        label="Deadline (Muddat)"
        error={errors.deadline?.message}
        {...register('deadline')}
      />

      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-medium text-[#191b23] dark:text-slate-200">
          Biriktiriladigan fayllar va manbalar
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <UploadCard
            icon={FileText}
            tone="red"
            label="PDF"
            sublabel="Yuklash"
            accept=".pdf"
            value={attachments.pdf}
            onChange={(value) => onAttachmentChange('pdf', value)}
          />
          <UploadCard
            icon={Video}
            tone="blue"
            label="Video"
            sublabel="Link yoki fayl"
            accept="video/*"
            value={attachments.video}
            onChange={(value) => onAttachmentChange('video', value)}
          />
          <UploadCard
            icon={Github}
            tone="slate"
            label="GitHub"
            sublabel="Repozitoriya"
            value={attachments.github}
            onChange={(value) => onAttachmentChange('github', value)}
          />
          <UploadCard
            icon={FigmaIcon}
            tone="orange"
            label="Figma"
            sublabel="Dizayn linki"
            value={attachments.figma}
            onChange={(value) => onAttachmentChange('figma', value)}
          />
        </div>
      </div>
    </>
  );
}
