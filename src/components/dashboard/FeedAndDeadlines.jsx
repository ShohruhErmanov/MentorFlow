import { Clock, CalendarDays } from 'lucide-react';

const activityFeed = [
  {
    id: 1,
    initial: 'A',
    bgColor: 'bg-secondary-container',
    textColor: 'text-on-secondary-container',
    message: (
      <>
        <span className="font-semibold">Azizbek</span> vazifani yukladi:{' '}
        <span className="text-on-surface-variant italic">JavaScript Asoslari</span>
      </>
    ),
    time: '10 daqiqa oldin',
  },
  {
    id: 2,
    initial: 'M',
    bgColor: 'bg-tertiary-container',
    textColor: 'text-on-tertiary-container',
    message: (
      <>
        <span className="font-semibold">Malika</span> savol so'radi:{' '}
        <span className="text-on-surface-variant italic">React Hooks haqida</span>
      </>
    ),
    time: '45 daqiqa oldin',
  },
  {
    id: 3,
    initial: 'S',
    bgColor: 'bg-surface-variant',
    textColor: 'text-on-surface-variant',
    message: (
      <>
        <span className="font-semibold">Sardor</span> testni yakunladi (95%)
      </>
    ),
    time: '2 soat oldin',
  },
];

const deadlines = [
  {
    id: 1,
    title: 'HTML/CSS Loyiha',
    group: 'Frontend Guruhi',
    badge: 'Bugun 23:59',
    isUrgent: true,
    icon: Clock,
  },
  {
    id: 2,
    title: 'Python Data Analysis',
    group: 'Backend Guruhi',
    badge: 'Ertaga',
    isUrgent: false,
    icon: CalendarDays,
  },
];

export default function FeedAndDeadlines() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col gap-6">
      {/* Activity Feed */}
      <div>
        <div className="flex justify-between items-center mb-md">
          <h3 className="text-title-lg font-semibold text-on-background">
            So'nggi faollik
          </h3>
          <button className="text-primary text-label-sm font-semibold hover:underline">
            Barchasi
          </button>
        </div>

        <ul className="space-y-4">
          {activityFeed.map(({ id, initial, bgColor, textColor, message, time }) => (
            <li key={id} className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-full ${bgColor} flex-shrink-0 flex items-center justify-center text-label-md font-semibold ${textColor}`}
              >
                {initial}
              </div>
              <div>
                <p className="text-body-md text-on-background">{message}</p>
                <span className="text-label-sm text-outline">{time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-outline-variant/50" />

      {/* Deadlines */}
      <div>
        <h3 className="text-title-lg font-semibold text-on-background mb-md">
          Yaqinlashayotgan muddatlar
        </h3>
        <ul className="space-y-3">
          {deadlines.map(({ id, title, group, badge, isUrgent, icon: Icon }) => (
            <li
              key={id}
              className={`flex items-center justify-between p-3 bg-surface-container-low rounded-lg border border-outline-variant/50 border-l-4 ${
                isUrgent ? 'border-l-error' : 'border-l-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={20}
                  className={isUrgent ? 'text-error' : 'text-primary'}
                />
                <div>
                  <p className="text-label-md font-medium text-on-background">{title}</p>
                  <p className="text-label-sm text-on-surface-variant">{group}</p>
                </div>
              </div>
              <span
                className={`text-label-sm font-semibold px-2 py-1 rounded whitespace-nowrap ${
                  isUrgent
                    ? 'bg-error-container text-on-error-container'
                    : 'bg-primary-container text-on-primary-container'
                }`}
              >
                {badge}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
