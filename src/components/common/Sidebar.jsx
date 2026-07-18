import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { FiActivity } from 'react-icons/fi';
import { NAVIGATION } from '../../constants/navigation';
import { ROLE_LABELS } from '../../constants/roles';

export function Sidebar({ role, isOpen, onClose }) {
  const items = NAVIGATION[role] ?? [];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-ink-900/40 lg:hidden"
        />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-100 bg-surface transition-transform duration-200 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-2 px-5 py-5">
          <FiActivity className="text-vital-600" size={22} />
          <span className="font-display text-lg font-semibold text-ink-900">MediCore</span>
        </div>

        <p className="px-5 pb-2 text-xs font-medium uppercase tracking-wider text-ink-300">
          {ROLE_LABELS[role]} portal
        </p>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
          {items.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-clinical-100 text-clinical-900'
                    : 'text-ink-500 hover:bg-canvas-dim hover:text-ink-900'
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
