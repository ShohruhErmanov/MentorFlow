import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useDashboard } from '../hooks/useDashboard'
import Sidebar from '../components/dashboard/Sidebar'
import Header  from '../components/dashboard/Header'

/**
 * DashboardLayout — 100 vh, overflow-hidden root.
 * Sidebar is fixed 280 px on desktop; a mobile drawer on mobile.
 */
export default function DashboardLayout() {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useDashboard()

  // Close drawer on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSidebar() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeSidebar])

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Mobile backdrop ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* ── Main column ── */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-[280px]">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-y-auto focus:outline-none" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
