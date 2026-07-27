import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardCheck, Save } from 'lucide-react';
import FormModal from '../../ui/FormModal';
import AssignmentForm from './AssignmentForm';
import { assignmentManagementSchema } from '../../../validation/assignmentManagementSchema';
import { MENTOR_OPTIONS } from '../../../constants/mockAssignments';

const emptyAttachments = { pdf: null, video: null, github: null, figma: null };

function emptyValues() {
  return {
    title: '',
    course: '',
    group: '',
    mentorName: '',
    shortDescription: '',
    requirements: '',
    maxScore: '',
    deadline: '',
  };
}

function toDateTimeInputValue(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function valuesFromAssignment(assignment) {
  return {
    title: assignment.title,
    course: assignment.course,
    group: assignment.group,
    mentorName: assignment.mentor.name,
    shortDescription: assignment.shortDescription,
    requirements: assignment.requirements.join('\n'),
    maxScore: assignment.maxScore,
    deadline: toDateTimeInputValue(assignment.deadline),
  };
}

export default function AssignmentModal({ mode, isOpen, onClose, onSubmit, assignment }) {
  const isEdit = mode === 'edit';
  const [attachments, setAttachments] = useState(emptyAttachments);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(assignmentManagementSchema), defaultValues: emptyValues() });

  useEffect(() => {
    if (!isOpen) return;
    reset(isEdit && assignment ? valuesFromAssignment(assignment) : emptyValues());
    setAttachments(isEdit && assignment ? assignment.attachments : emptyAttachments);
  }, [isOpen, isEdit, assignment, reset]);

  const handleAttachmentChange = (type, value) => {
    setAttachments((prev) => ({ ...prev, [type]: value }));
  };

  const submit = handleSubmit((data) => {
    const mentor = MENTOR_OPTIONS.find((m) => m.name === data.mentorName) ?? MENTOR_OPTIONS[0];
    const requirements = data.requirements
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    onSubmit({
      ...data,
      mentor,
      requirements,
      deadline: new Date(data.deadline).toISOString(),
      attachments,
    });
  });

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Vazifani tahrirlash' : 'Yangi vazifa yaratish'}
      subtitle={isEdit ? "Vazifa ma'lumotlarini yangilang" : 'Topshiriq tafsilotlarini kiriting'}
      icon={ClipboardCheck}
      onSubmit={submit}
      isSubmitting={isSubmitting}
      submitIcon={Save}
    >
      <AssignmentForm
        register={register}
        errors={errors}
        attachments={attachments}
        onAttachmentChange={handleAttachmentChange}
      />
    </FormModal>
  );
}
