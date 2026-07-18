import clsx from 'clsx';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import { Card } from '../ui/Card';

export function StatCard({ label, value, icon: Icon, trend, trendDirection = 'up', accent = 'clinical' }) {
  const ACCENTS = {
    clinical: 'bg-clinical-100 text-clinical-700',
    vital: 'bg-vital-100 text-vital-600',
    amber: 'bg-amber-100 text-amber-600',
    coral: 'bg-coral-100 text-coral-600',
  };

  return (
    <Card hoverable className="flex items-start justify-between">
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="mt-2 font-display text-2xl font-semibold text-ink-900">{value}</p>
        {trend && (
          <p
            className={clsx(
              'mt-1.5 flex items-center gap-1 text-xs font-medium',
              trendDirection === 'up' ? 'text-vital-600' : 'text-coral-600'
            )}
          >
            {trendDirection === 'up' ? <FiArrowUpRight size={13} /> : <FiArrowDownRight size={13} />}
            {trend}
          </p>
        )}
      </div>
      {Icon && (
        <span className={clsx('flex h-10 w-10 items-center justify-center rounded-xl', ACCENTS[accent])}>
          <Icon size={18} />
        </span>
      )}
    </Card>
  );
}
