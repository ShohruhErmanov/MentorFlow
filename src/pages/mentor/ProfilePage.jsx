import { motion } from 'framer-motion';
import { UserCog } from 'lucide-react';
import ProfileCard from '../../components/profile/ProfileCard';
import SecurityCard from '../../components/profile/SecurityCard';
import NotificationSettings from '../../components/profile/NotificationSettings';
import SystemSettings from '../../components/profile/SystemSettings';
import LogoutCard from '../../components/profile/LogoutCard';
import { currentUser, languages, notificationSettings } from '../../data/profileData';

function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start gap-4"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#6366f1] shadow-md shadow-blue-200/50">
        <UserCog size={22} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-extrabold leading-tight text-[#191b23] dark:text-white sm:text-3xl">
          Profil Sozlamalari
        </h1>
        <p className="mt-1 text-sm text-[#737686] dark:text-slate-400 sm:text-base">
          Shaxsiy ma'lumotlaringiz va tizim sozlamalarini boshqaring.
        </p>
      </div>
    </motion.div>
  );
}

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 2xl:max-w-[1600px]">
      {/* Page Header */}
      <PageHeader />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* ── Left Column ── */}
        <div className="flex flex-col gap-6">
          <ProfileCard user={currentUser} />
          <SecurityCard />
        </div>

        {/* ── Right Column ── */}
        <div className="flex flex-col gap-6">
          <NotificationSettings notifications={notificationSettings} />
          <SystemSettings languages={languages} themes={themes} />
          <LogoutCard />
        </div>
      </div>
    </div>
  );
}
