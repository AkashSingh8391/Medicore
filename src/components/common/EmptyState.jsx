import { PulseLine } from '../ui/PulseLine';

export function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-100 bg-surface py-16 text-center">
      <div className="w-40 opacity-70">
        <PulseLine />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink-500">{description}</p>
    </div>
  );
}
