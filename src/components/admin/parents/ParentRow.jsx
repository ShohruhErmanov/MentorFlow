import { motion } from 'framer-motion';
import { Ban, Eye, Mail, Pencil, ShieldCheck, Trash2 } from 'lucide-react';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import StatusBadge from './StatusBadge';
import PaymentBadge from './PaymentBadge';

export default function ParentRow({ parent, index, onView, onEdit, onMessage, onToggleBlock, onDelete }) {
  const isBlocked = parent.status === 'inactive';
  const groups = parent.children.map((c) => c.group).join(', ');
  const mentors = parent.children.map((c) => c.mentor).join(', ');

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
            initials={`${parent.firstName[0]}${parent.lastName[0]}`}
            src={parent.avatarUrl}
            alt={`${parent.firstName} ${parent.lastName}`}
          />
          <div>
            <p className="text-sm font-bold text-[#191b23] dark:text-white">
              {parent.firstName} {parent.lastName}
            </p>
            <div className="mt-1">
              <StatusBadge status={parent.status} />
            </div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{parent.phone}</p>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{parent.email}</p>
      </td>
      <td className="px-6 py-4">
        {parent.children.map((child) => (
          <p key={child.name} className="text-sm font-medium text-[#434655] dark:text-slate-300">
            {child.name}
          </p>
        ))}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-semibold text-[#191b23] dark:text-white">{groups}</p>
        <p className="text-xs font-medium text-[#737686] dark:text-slate-400">{mentors}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <PaymentBadge status={parent.paymentStatus} overdueDays={parent.overdueDays} />
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <p className="text-sm font-medium text-[#434655] dark:text-slate-300">{parent.lastLoginDisplay}</p>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
            onClick={() => onView(parent)}
            aria-label="Ko'rish"
            title="Ko'rish"
          >
            <Eye size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
            onClick={() => onEdit(parent)}
            aria-label="Tahrirlash"
            title="Tahrirlash"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-[#2563eb] dark:text-slate-400"
            onClick={() => onMessage(parent)}
            aria-label="Xabar yuborish"
            title="Xabar yuborish"
          >
            <Mail size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={
              isBlocked
                ? 'h-8 w-8 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400'
                : 'h-8 w-8 text-red-500 hover:text-red-600 dark:text-red-400'
            }
            onClick={() => onToggleBlock(parent)}
            aria-label={isBlocked ? 'Faollashtirish' : 'Bloklash'}
            title={isBlocked ? 'Faollashtirish' : 'Bloklash'}
          >
            {isBlocked ? <ShieldCheck size={16} /> : <Ban size={16} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[#737686] hover:text-red-600 dark:text-slate-400"
            onClick={() => onDelete(parent)}
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
