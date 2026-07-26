import { motion } from 'framer-motion';
import { Ban, Eye, Pencil, ShieldCheck, Trash2 } from 'lucide-react';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import RoleBadge from './RoleBadge';
import StatusBadge from './StatusBadge';

export default function UserRow({ user, index, onView, onEdit, onToggleBlock, onDelete }) {
  const isBlocked = user.status === 'blocked';

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="group bg-white transition-colors hover:bg-[#faf8ff] dark:bg-slate-800 dark:hover:bg-slate-700/40"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar
            initials={`${user.firstName[0]}${user.lastName[0]}`}
            style={{ backgroundColor: user.avatarColor, color: '#fff', borderColor: 'transparent' }}
          />
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs font-medium text-[#737686] dark:text-slate-400">ID: {user.id}</p>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{user.phone}</p>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{user.email}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{user.lastLoginDisplay}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
            onClick={() => onView(user)}
            aria-label="Ko'rish"
            title="Ko'rish"
          >
            <Eye size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
            onClick={() => onEdit(user)}
            aria-label="Tahrirlash"
            title="Tahrirlash"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={
              isBlocked
                ? 'h-8 w-8 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400'
                : 'h-8 w-8 text-red-500 hover:text-red-600 dark:text-red-400'
            }
            onClick={() => onToggleBlock(user)}
            aria-label={isBlocked ? 'Faollashtirish' : 'Bloklash'}
            title={isBlocked ? 'Faollashtirish' : 'Bloklash'}
          >
            {isBlocked ? <ShieldCheck size={16} /> : <Ban size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-red-600 dark:text-slate-400"
            onClick={() => onDelete(user)}
            aria-label="O'chirish"
            title="O'chirish"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </motion.tr>
  );
}
