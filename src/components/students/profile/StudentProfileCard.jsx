import { Mail, Phone, MapPin, Calendar, MessageSquare, MoreHorizontal } from 'lucide-react';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import StatusBadge from '../StatusBadge';

export default function StudentProfileCard({ student, onMessageClick }) {
  return (
    <div className="rounded-[24px] border border-[#e1e2ed] bg-white p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col items-center text-center">
        <img 
          src={student.avatar} 
          alt={student.name} 
          className="mb-5 h-32 w-32 rounded-full object-cover"
        />
        <h2 className="text-2xl font-bold text-[#191b23]">{student.name}</h2>
        <p className="mt-1.5 text-[13px] font-medium text-[#737686]">
          {student.course} · {student.group}
        </p>
        
        <div className="mt-5 flex justify-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
            {student.status.toUpperCase()}
          </span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#2563eb]">
            TOP 10%
          </span>
        </div>
      </div>

      <div className="mt-8 space-y-5 border-t border-[#f3f4f6] pt-8">
        <div className="flex items-center gap-3 text-[14px]">
          <Mail size={18} className="text-[#737686]" />
          <span className="font-medium text-[#434655] truncate">{student.email}</span>
        </div>
        
        <div className="flex items-center gap-3 text-[14px]">
          <Phone size={18} className="text-[#737686]" />
          <span className="font-medium text-[#434655]">{student.phone}</span>
        </div>
        
        <div className="flex items-start gap-3 text-[14px]">
          <MapPin size={18} className="mt-0.5 shrink-0 text-[#737686]" />
          <span className="font-medium text-[#434655] leading-tight">Toshkent sh., Yunusobod<br/>tumani</span>
        </div>
        
        <div className="flex items-center gap-3 text-[14px]">
          <Calendar size={18} className="text-[#737686]" />
          <span className="font-medium text-[#434655]">Qo'shilgan: 12 Oktabr, 2023</span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button 
          onClick={onMessageClick}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0052cc] font-semibold text-white transition-colors hover:bg-[#0047b3]"
        >
          <MessageSquare size={18} />
          <span>Xabar yozish</span>
        </button>
        <Dropdown
          trigger={
            <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e1e2ed] bg-white text-[#737686] transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">
              <MoreHorizontal size={20} />
            </button>
          }
        >
          <div className="min-w-[160px] py-1">
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">
              Tahrirlash
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">
              Davomat
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">
              Baholar
            </button>
            <button className="flex w-full items-center px-4 py-2 text-sm text-[#434655] hover:bg-[#f3f3fe] hover:text-[#2563eb]">
              Vazifalar
            </button>
            <div className="my-1 h-px bg-[#e1e2ed]"></div>
            <button className="flex w-full items-center px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
              O'chirish
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
