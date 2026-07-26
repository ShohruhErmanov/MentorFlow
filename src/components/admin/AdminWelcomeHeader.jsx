import { motion } from 'framer-motion';
import { BookPlus, UserPlus, Users } from 'lucide-react';
import Button from '../ui/Button';

export default function AdminWelcomeHeader({ activityCount, onAddUser, onAddGroup, onAddCourse }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h1 className="text-[28px] font-bold leading-tight tracking-[0] text-[#191b23] dark:text-white sm:text-[32px]">
          Xush kelibsiz, Admin!
        </h1>
        <p className="mt-2 text-sm font-medium leading-6 text-[#737686] dark:text-slate-400 sm:text-[15px]">
          Bugun tizimda {activityCount} ta yangi harakat qayd etildi.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="primary" size="md" onClick={onAddUser}>
          <UserPlus size={17} strokeWidth={2.2} aria-hidden="true" />
          Yangi foydalanuvchi
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="border border-[#e1e2ed] dark:border-slate-700"
          onClick={onAddGroup}
        >
          <Users size={17} strokeWidth={2.2} aria-hidden="true" />
          Yangi guruh
        </Button>
        <Button
          variant="ghost"
          size="md"
          className="border border-[#e1e2ed] dark:border-slate-700"
          onClick={onAddCourse}
        >
          <BookPlus size={17} strokeWidth={2.2} aria-hidden="true" />
          Yangi kurs
        </Button>
      </div>
    </motion.section>
  );
}
