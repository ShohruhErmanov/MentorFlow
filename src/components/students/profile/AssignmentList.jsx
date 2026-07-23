import { Code, FileText, CheckCircle, ArrowRight } from 'lucide-react';

const mockAssignments = [
  {
    id: 1,
    title: 'Custom Hook yaratish (useFetch)',
    module: 'React Advanced',
    deadline: 'Bugun 23:59 da',
    status: 'Bajarilmoqda',
    icon: Code,
    statusColor: 'bg-orange-50 text-orange-600',
    grade: null
  },
  {
    id: 2,
    title: 'Context API orqali State Management',
    module: 'React Advanced',
    deadline: 'Kecha topshirildi',
    status: 'Tekshirilmoqda',
    icon: FileText,
    statusColor: 'bg-gray-100 text-gray-600',
    grade: null
  },
  {
    id: 3,
    title: 'React Router asoslari',
    module: 'React Fundamentals',
    deadline: 'Topshirilgan',
    status: 'Qabul qilindi',
    icon: CheckCircle,
    statusColor: 'bg-emerald-50 text-emerald-600',
    grade: 'Baho: 100/100 • Izoh: "Juda yaxshi yechim!"'
  }
];

export default function AssignmentList() {
  return (
    <div className="rounded-[24px] border border-[#e1e2ed] bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[22px] font-bold tracking-tight text-[#191b23]">Ushbu haftadagi topshiriqlar</h3>
        <button className="flex items-center gap-1.5 text-[13px] font-bold text-[#2563eb] hover:text-blue-700">
          Barchasini ko'rish
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {mockAssignments.map((assignment) => {
          const Icon = assignment.icon;
          return (
            <div 
              key={assignment.id} 
              className="flex items-center justify-between gap-4 rounded-[16px] border border-[#e1e2ed] p-5 transition-colors hover:border-[#2563eb] hover:bg-[#faf8ff] group"
            >
              <div className="flex gap-4 min-w-0 flex-1">
                <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#f3f4f6] text-[#737686] group-hover:bg-white group-hover:text-[#2563eb] transition-colors shadow-sm">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[15px] font-bold text-[#191b23] truncate">{assignment.title}</h4>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[#737686]">
                    <span>{assignment.deadline}</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span>Modul: {assignment.module}</span>
                  </p>
                  {assignment.grade && (
                    <p className="mt-2 text-[12px] font-bold text-[#059669]">
                      {assignment.grade}
                    </p>
                  )}
                </div>
              </div>
              <div className="shrink-0">
                <span className={`inline-flex rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${assignment.statusColor}`}>
                  {assignment.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
