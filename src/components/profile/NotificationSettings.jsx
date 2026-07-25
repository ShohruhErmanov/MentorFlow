import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import Checkbox from '../ui/Checkbox';

export default function NotificationSettings({ notifications }) {
  const [settings, setSettings] = useState(() =>
    Object.fromEntries(notifications.map((n) => [n.id, n.defaultChecked]))
  );

  const toggle = (id) => setSettings((s) => ({ ...s, [id]: !s[id] }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[#e1e2ed] bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
          <Bell size={16} className="text-amber-500 dark:text-amber-400" />
        </div>
        <h2 className="text-base font-bold text-[#191b23] dark:text-white">Bildirishnomalar</h2>
      </div>

      {/* Notification items */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <label
            key={notif.id}
            htmlFor={notif.id}
            className="flex cursor-pointer items-start gap-3 group"
          >
            {/* Checkbox */}
            <div className="mt-0.5">
              <Checkbox
                id={notif.id}
                checked={settings[notif.id]}
                onChange={() => toggle(notif.id)}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1 pointer-events-none">
              <p className="text-sm font-semibold text-[#191b23] group-hover:text-[#2563eb] transition-colors duration-150 dark:text-white">
                {notif.label}
              </p>
              <p className="mt-0.5 text-xs text-[#737686] dark:text-slate-400">{notif.description}</p>
            </div>
          </label>
        ))}
      </div>
    </motion.div>
  );
}
