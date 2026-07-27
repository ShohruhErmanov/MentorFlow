import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CalendarX2, CheckCircle2, Clock3 } from 'lucide-react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import AttendanceBadge from './AttendanceBadge';
import { useTheme } from '../../../hooks/useTheme';

const STATUS_SCORE = { present: 100, late: 50, excused: 50, absent: 0 };

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-[#191b23] px-3 py-2 text-xs font-semibold text-white shadow-lg dark:bg-slate-900">
      {label}: {payload[0].value}%
    </div>
  );
}

export default function ProfileModal({ isOpen, onClose, student }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const chartData = useMemo(() => {
    if (!student) return [];
    return [...student.history]
      .slice(0, 10)
      .reverse()
      .map((entry) => ({
        label: new Date(entry.date).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit' }),
        value: STATUS_SCORE[entry.status] ?? 0,
      }));
  }, [student]);

  const counts = useMemo(() => {
    if (!student) return { late: 0, absent: 0 };
    return {
      late: student.history.filter((h) => h.status === 'late').length,
      absent: student.history.filter((h) => h.status === 'absent').length,
    };
  }, [student]);

  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="O'quvchi davomati" className="max-w-xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {student.avatarUrl ? (
            <img
              src={student.avatarUrl}
              alt={`${student.firstName} ${student.lastName}`}
              className="h-16 w-16 rounded-full object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dbe1ff] text-lg font-bold text-[#2563eb] dark:bg-blue-500/10 dark:text-blue-400">
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
          )}
          <div>
            <p className="text-lg font-bold text-[#191b23] dark:text-white">
              {student.firstName} {student.lastName}
            </p>
            <p className="mt-0.5 text-sm font-medium text-[#737686] dark:text-slate-400">
              {student.group.label} &bull; {student.group.mentor}
            </p>
            <div className="mt-1.5">
              <AttendanceBadge status={student.todayStatus} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 text-center">
            <p className="text-xl font-bold text-[#191b23] dark:text-white">{student.monthlyPercent}%</p>
            <p className="mt-1 text-xs font-semibold text-[#737686] dark:text-slate-400">Oylik davomat</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400">
              <Clock3 size={16} />
              <p className="text-xl font-bold">{counts.late}</p>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#737686] dark:text-slate-400">Kechikishlar</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-red-600 dark:text-red-400">
              <CalendarX2 size={16} />
              <p className="text-xl font-bold">{counts.absent}</p>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#737686] dark:text-slate-400">Kelmagan kunlar</p>
          </Card>
        </div>

        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#2563eb] dark:text-blue-400" />
            <h3 className="text-sm font-bold text-[#191b23] dark:text-white">Davomat dinamikasi</h3>
          </div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke={isDark ? '#334155' : '#e1e2ed'} />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{ fill: isDark ? '#94a3b8' : '#737686', fontSize: 11, fontWeight: 600 }}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{ fill: isDark ? '#94a3b8' : '#737686', fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#2563eb', strokeWidth: 1 }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isDark ? '#3b82f6' : '#2563eb'}
                  fill={isDark ? '#3b82f6' : '#2563eb'}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex justify-end border-t border-[#e1e2ed] pt-4 dark:border-slate-700">
          <Button variant="ghost" onClick={onClose}>
            Yopish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
