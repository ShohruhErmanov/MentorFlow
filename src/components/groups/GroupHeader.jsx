import { motion } from 'framer-motion';
import { ChevronRight, Edit2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function GroupHeader({ group }) {
  if (!group) return null;

  return (
    <div className="mb-8 space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#737686]">
        <Link to="/mentor/groups" className="hover:text-[#2563eb] transition-colors">
          Guruhlar
        </Link>
        <ChevronRight size={16} />
        <span className="text-[#191b23]">{group.name}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold tracking-tight text-[#191b23] sm:text-3xl">
            {group.course} Dasturlash - {group.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#737686]">
            {group.schedule} | {group.time}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <Button variant="ghost" className="bg-white border border-[#e1e2ed] hover:border-[#2563eb] hover:bg-[#f3f3fe]">
            <Edit2 size={18} />
            <span>Tahrirlash</span>
          </Button>
          <Button variant="primary">
            <Plus size={18} />
            <span>Vazifa qo'shish</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
