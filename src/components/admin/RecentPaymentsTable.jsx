import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { recentPayments } from '../../data/adminDashboardData';

const statusMeta = {
  success: { label: 'Muvaffaqiyatli', variant: 'green' },
  pending: { label: 'Kutilmoqda', variant: 'orange' },
};

export default function RecentPaymentsTable() {
  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[20px] font-bold leading-7 tracking-[0] text-[#191b23] dark:text-white">
          Oxirgi to'lovlar
        </h2>
        <Link
          to="#"
          className="text-sm font-semibold text-[#2563eb] hover:text-[#1d4ed8] dark:text-blue-400 dark:hover:text-blue-300"
        >
          Hammasini ko'rish
        </Link>
      </div>

      {recentPayments.length === 0 ? (
        <p className="py-10 text-center text-sm font-medium text-[#737686] dark:text-slate-400">
          Hozircha to'lovlar mavjud emas.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left">
            <thead>
              <tr className="border-b border-[#e1e2ed] text-xs font-semibold uppercase tracking-wider text-[#737686] dark:border-slate-700 dark:text-slate-400">
                <th className="py-3 pr-4">Talaba</th>
                <th className="py-3 pr-4">Miqdor</th>
                <th className="py-3 pr-4">Sana</th>
                <th className="py-3">Holati</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e2ed] dark:divide-slate-700">
              {recentPayments.map((payment) => {
                const status = statusMeta[payment.status];
                return (
                  <tr key={payment.id}>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={payment.student.initials} size="sm" />
                        <div>
                          <p className="text-sm font-semibold text-[#191b23] dark:text-white">
                            {payment.student.name}
                          </p>
                          <p className="text-xs text-[#737686] dark:text-slate-400">{payment.group}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-sm font-semibold text-[#191b23] dark:text-white">
                      {payment.amount} <span className="text-xs text-[#737686] dark:text-slate-400">{payment.currency}</span>
                    </td>
                    <td className="py-3.5 pr-4 text-sm font-medium text-[#434655] dark:text-slate-300">
                      {payment.date}
                    </td>
                    <td className="py-3.5">
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
