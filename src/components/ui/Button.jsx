import clsx from 'clsx';

const VARIANTS = {
  primary:
    'bg-clinical-700 text-white hover:bg-clinical-900 focus-visible:outline-clinical-500 shadow-sm',
  secondary:
    'bg-vital-100 text-vital-600 hover:bg-vital-100/70 focus-visible:outline-vital-500',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100/60 focus-visible:outline-ink-300',
  danger:
    'bg-coral-500 text-white hover:bg-coral-600 focus-visible:outline-coral-500',
};

const SIZES = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 rounded-xl',
  lg: 'text-base px-5 py-3 rounded-xl',
};

export function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" />
      )}
      {children}
    </Component>
  );
}
