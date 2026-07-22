import { motion } from 'framer-motion'

/**
 * Abstract dashboard illustration — scales to fill available space.
 * Uses w-full + max-h-[240px] so it never overflows the left panel.
 */
export default function DashboardIllustration() {
  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <div className="absolute -inset-3 bg-gradient-to-br from-primary/8 via-blue-200/15 to-indigo-200/8 rounded-2xl blur-xl pointer-events-none" />

      {/* Main card */}
      <div className="relative bg-white rounded-xl border border-border shadow-login overflow-hidden">

        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-gradient-to-r from-gray-50 to-blue-50/40">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/70" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <div className="w-2 h-2 rounded-full bg-green-400/70" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-14 h-1.5 bg-gray-200 rounded-full" />
            <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
            </div>
          </div>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-blue-400" />
        </div>

        <div className="p-3 space-y-2.5">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "O'quvchilar", value: '248', color: 'from-blue-500 to-primary', icon: '👨‍🎓' },
              { label: 'Vazifalar',   value: '36',  color: 'from-violet-500 to-purple-400', icon: '📝' },
              { label: 'Yutuqlar',   value: '94%', color: 'from-emerald-500 to-teal-400', icon: '🏆' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-lg border border-border p-2 flex flex-col gap-1 shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.55 + i * 0.08 }}
              >
                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${stat.color} flex items-center justify-center text-[10px] shadow-sm`}>
                  {stat.icon}
                </div>
                <p className="text-[11px] font-bold text-heading leading-none">{stat.value}</p>
                <p className="text-[9px] text-body leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Bar chart */}
          <motion.div
            className="bg-gradient-to-br from-primary-light to-blue-50 rounded-lg p-2.5 border border-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div>
                <p className="text-[9px] font-semibold text-heading leading-none">O'quvchilar rivojlanishi</p>
                <p className="text-[8px] text-body mt-0.5">Joriy oy</p>
              </div>
              <span className="text-[9px] font-bold text-primary bg-primary-light px-1.5 py-0.5 rounded">+12%</span>
            </div>
            {/* Bars */}
            <div className="flex items-end gap-1 h-10">
              {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t-[2px] ${i === 5 || i === 7 ? 'bg-primary' : 'bg-primary/20'}`}
                  style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.35, delay: 0.9 + i * 0.04, ease: 'easeOut' }}
                />
              ))}
            </div>
            {/* X-axis */}
            <div className="flex gap-1 mt-1">
              {['D', 'S', 'Ch', 'P', 'J', 'Sh', 'Ya', 'B'].map((d, i) => (
                <p key={i} className="flex-1 text-center text-[6px] text-body">{d}</p>
              ))}
            </div>
          </motion.div>

          {/* Task list — only 2 rows to save vertical space */}
          <div className="space-y-1">
            <p className="text-[9px] font-semibold text-heading px-0.5">Oxirgi vazifalar</p>
            {[
              { name: 'Matematika testi', status: 'Bajarildi', done: true },
              { name: 'Ingliz tili ishi', status: 'Jarayonda', done: false },
            ].map((task, i) => (
              <motion.div
                key={task.name}
                className="flex items-center gap-1.5 bg-gray-50 rounded-md px-2 py-1 border border-border/50"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 1.0 + i * 0.07 }}
              >
                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${task.done ? 'bg-success' : 'bg-gray-200'}`}>
                  {task.done && (
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <path d="M1 2.5L2.5 4L6 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className={`text-[9px] font-medium flex-1 truncate ${task.done ? 'line-through text-body/50' : 'text-heading'}`}>
                  {task.name}
                </span>
                <span className={`text-[8px] px-1 py-0.5 rounded font-medium ${task.done ? 'bg-success/10 text-success' : 'bg-orange-100 text-orange-600'}`}>
                  {task.status}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Floating notification badge */}
      <motion.div
        className="absolute -top-2.5 -right-2.5 bg-white border border-border rounded-xl shadow-card px-2 py-1 flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1.2 },
          scale:   { duration: 0.4, delay: 1.2 },
          y:       { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
      >
        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center text-[10px]">🔔</div>
        <div>
          <p className="text-[8px] font-semibold text-heading leading-none">3 yangi xabar</p>
          <p className="text-[7px] text-body mt-0.5">Az oldin</p>
        </div>
      </motion.div>

      {/* Floating score badge */}
      <motion.div
        className="absolute -bottom-2.5 -left-2.5 bg-white border border-border rounded-xl shadow-card px-2 py-1 flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 0.4, delay: 1.4 },
          scale:   { duration: 0.4, delay: 1.4 },
          y:       { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2 },
        }}
      >
        <div className="w-5 h-5 rounded-md bg-success/10 flex items-center justify-center text-[10px]">⭐</div>
        <div>
          <p className="text-[8px] font-semibold text-success leading-none">94% Reyting</p>
          <p className="text-[7px] text-body mt-0.5">Bu oy</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
