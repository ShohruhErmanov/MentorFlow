import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import { Plus, Settings, LogOut, X } from 'lucide-react'
import { NAV_ITEMS } from '../../constants/dashboardData'

// ─── Sidebar Shell ──────────────────────────────────────────────────────────
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop — always visible */}
      <aside
        aria-label="Asosiy menyu"
        className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-[280px] bg-white border-r border-slate-100 z-30"
        style={{ boxShadow: '2px 0 24px 0 rgba(15,23,42,0.04)' }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 340, damping: 32 }}
            aria-label="Asosiy menyu"
            className="flex flex-col fixed inset-y-0 left-0 w-[280px] bg-white border-r border-slate-100 z-30 lg:hidden"
            style={{ boxShadow: '4px 0 32px 0 rgba(15,23,42,0.12)' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
              aria-label="Menyuni yopish"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Inner Content ───────────────────────────────────────────────────────────
function SidebarContent() {
  return (
    <div className="flex flex-col h-full select-none">
      <Logo />
      <NewTaskButton />

      <nav className="flex-1 px-3 overflow-y-auto py-2" aria-label="Dashboard navigatsiyasi">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2 mt-1">
          Asosiy
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.id} item={item} index={i} />
          ))}
        </ul>
      </nav>

      <ProfileCard />
    </div>
  )
}

// ─── Logo ────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="px-5 pt-6 pb-4 flex items-center gap-3 flex-shrink-0">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
           style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
        <span className="text-white font-bold text-sm">M</span>
      </div>
      <div>
        <p className="text-[15px] font-semibold text-slate-900 leading-none">MentorFlow</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Mentor Dashboard</p>
      </div>
    </div>
  )
}

// ─── New Task Button ─────────────────────────────────────────────────────────
function NewTaskButton() {
  return (
    <div className="px-3 mb-3 flex-shrink-0">
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: '0 8px 28px -4px rgba(37,99,235,0.38)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="w-full flex items-center justify-center gap-2 text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-shadow"
        style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 14px -2px rgba(37,99,235,0.3)' }}
        aria-label="Yangi vazifa qo'shish"
      >
        <Plus size={16} strokeWidth={2.5} />
        Yangi vazifa
      </motion.button>
    </div>
  )
}

// ─── Nav Item ────────────────────────────────────────────────────────────────
function NavItem({ item, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 + index * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          clsx(
            'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
            isActive
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          )
        }
        aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
      >
        {({ isActive }) => (
          <>
            <item.Icon
              size={18}
              className={clsx(
                'flex-shrink-0 transition-colors',
                isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
              )}
            />
            <span className="flex-1 truncate">{item.label}</span>

            {/* Active dot */}
            {isActive && (
              <motion.span
                layoutId="nav-dot"
                className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"
              />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  )
}

// ─── Profile Card ─────────────────────────────────────────────────────────────
function ProfileCard() {
  return (
    <div className="px-3 pb-5 flex-shrink-0 border-t border-slate-100 pt-3">
      <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)' }}
          aria-hidden="true"
        >
          MH
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-slate-900 leading-none truncate">
            Murod Hasanov
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 truncate">Senior Mentor</p>
        </div>

        {/* Action buttons appear on hover */}
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Sozlamalar"
          >
            <Settings size={14} />
          </button>
          <button
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            aria-label="Chiqish"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
