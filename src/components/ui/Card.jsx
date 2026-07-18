import clsx from 'clsx';

export function Card({ className, children, hoverable = false, ...props }) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-ink-100 bg-surface p-5 shadow-[var(--shadow-card)]',
        hoverable && 'transition-shadow duration-200 hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
