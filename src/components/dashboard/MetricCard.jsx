import { ArrowUpRight } from 'lucide-react';

/**
 * MetricCard - A stat card matching the Stitch Bento grid design.
 *
 * @param {object} props
 * @param {string}   props.label       - Uppercase label text
 * @param {string}   props.value       - Large display number
 * @param {string}   props.subLabel    - Small text next to value
 * @param {boolean}  [props.isUrgent]  - Red error-container style
 * @param {boolean}  [props.isTrending]- Show green trending indicator
 * @param {React.ReactNode} props.icon - Large background icon
 * @param {string}   [props.iconColor] - Tailwind text color for bg icon
 */
export default function MetricCard({
  label,
  value,
  subLabel,
  isUrgent = false,
  isTrending = false,
  icon: Icon,
  iconColor = 'text-primary',
}) {
  return (
    <div
      className={`border rounded-xl p-md shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${
        isUrgent
          ? 'bg-red-50 border-red-200'
          : 'bg-surface border-outline-variant'
      }`}
    >
      {/* Background decorative icon */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <Icon size={64} className={iconColor} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between relative z-10" style={{ minHeight: '110px' }}>
        {/* Label */}
        <span
          className={`text-[11px] uppercase tracking-widest font-semibold mb-3 block ${
            isUrgent ? 'text-error' : 'text-on-surface-variant'
          }`}
        >
          {label}
        </span>

        {/* Value row */}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-5xl font-bold leading-none tracking-tight ${
              isUrgent ? 'text-error' : 'text-on-background'
            }`}
          >
            {value}
          </span>
          {subLabel && (
            <span
              className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                isUrgent
                  ? 'text-error'
                  : isTrending
                  ? 'text-surface-tint'
                  : 'text-outline'
              }`}
            >
              {isTrending && <ArrowUpRight size={13} />}
              {subLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
