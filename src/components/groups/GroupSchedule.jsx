import { CalendarDays, Clock } from 'lucide-react';

export default function GroupSchedule({ schedule, time }) {
  // Parse schedule string to individual days if needed, but for now we just show it.
  const days = schedule.split(',').map((d) => d.trim());

  return (
    <div className="mt-4 flex flex-col gap-2.5 rounded-xl bg-[#f3f3fe] p-3 text-sm">
      <div className="flex items-center gap-2 font-medium text-[#434655]">
        <CalendarDays size={16} className="text-[#737686]" />
        <div className="flex gap-1.5">
          {days.map((day, idx) => (
            <span key={idx} className="rounded border border-[#e1e2ed] bg-white px-1.5 py-0.5 text-xs font-semibold">
              {day}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 font-medium text-[#434655]">
        <Clock size={16} className="text-[#737686]" />
        <span>{time}</span>
      </div>
    </div>
  );
}
