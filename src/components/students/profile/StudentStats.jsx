import { CalendarCheck, Award, CheckCircle2 } from 'lucide-react';

export default function StudentStats({ student }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Davomat */}
      <div className="flex flex-col justify-between rounded-[20px] border border-[#e1e2ed] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 rounded-md bg-[#f0f4ff] px-2 py-1.5 dark:bg-blue-500/10">
            <CalendarCheck size={14} className="text-[#2563eb]" />
            <span className="text-[11px] font-semibold text-[#434655] dark:text-slate-300">
              So'nggi 30 kun
            </span>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-[40px] font-bold leading-none tracking-tight text-[#191b23] dark:text-white">{student.attendance}%</h3>
          <p className="mt-2 text-[13px] font-medium leading-tight text-[#737686] dark:text-slate-400">Davomat<br/>ko'rsatkichi</p>
        </div>
      </div>

      {/* Card 2: Umumiy reyting */}
      <div className="flex flex-col justify-between rounded-[20px] border border-[#e1e2ed] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f4ff] text-[#2563eb] dark:bg-blue-500/10">
            <Award size={16} />
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#e5f5ec] px-2 py-1 text-[11px] font-bold text-[#059669] dark:bg-emerald-500/10 dark:text-emerald-400">
            ↑ 2.4%
          </span>
        </div>
        <div className="mt-6">
          <h3 className="text-[40px] font-bold leading-none tracking-tight text-[#191b23] dark:text-white">{student.score}</h3>
          <p className="mt-2 text-[13px] font-medium text-[#737686] dark:text-slate-400">Umumiy reyting</p>
        </div>
      </div>

      {/* Card 3: Topshirilgan vazifalar */}
      <div className="flex flex-col justify-between rounded-[20px] border border-[#e1e2ed] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-start">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff4ed] text-[#ea580c] dark:bg-orange-500/10 dark:text-orange-400">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="flex items-baseline gap-1 text-[40px] font-bold leading-none tracking-tight text-[#191b23] dark:text-white">
            {student.completedAssignments}
            <span className="text-xl font-bold text-[#737686] dark:text-slate-400">/45</span>
          </h3>
          <p className="mt-2 text-[13px] font-medium leading-tight text-[#737686] dark:text-slate-400">Topshirilgan<br/>vazifalar</p>
        </div>
      </div>

      {/* Card 4: Joriy modul */}
      <div className="flex flex-col justify-between rounded-[20px] border border-[#e1e2ed] bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:border-slate-700 dark:bg-slate-800">
        <div>
          <p className="text-[12px] font-semibold text-[#737686] dark:text-slate-400">Joriy modul<br/>progressi</p>
          <div className="mt-4 flex items-center justify-between">
            <h4 className="text-[15px] font-bold text-[#191b23] dark:text-white">React<br/>Hooks</h4>
            <span className="text-[15px] font-bold text-[#2563eb]">75%</span>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <p className="mb-2 text-[11px] font-semibold text-[#737686] dark:text-slate-400">3 ta dars qoldi</p>
        </div>
      </div>
    </div>
  );
}
