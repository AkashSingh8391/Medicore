import { useState } from 'react';
import { FiMenu, FiBell, FiSearch, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_LABELS } from '../../constants/roles';

export function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass sticky top-0 z-20 flex items-center gap-4 border-b border-ink-100 px-4 py-3 lg:px-6">
      <button onClick={onMenuClick} className="rounded-lg p-2 text-ink-500 hover:bg-canvas-dim lg:hidden" aria-label="Open menu">
        <FiMenu size={20} />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" size={16} />
        <input
          type="search"
          placeholder="Search patients, doctors, appointments…"
          className="w-full rounded-xl border border-ink-100 bg-surface/70 py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-lg p-2.5 text-ink-500 hover:bg-canvas-dim" aria-label="Notifications">
          <FiBell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral-500" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-canvas-dim"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clinical-700 text-xs font-semibold text-white">
              {user?.avatarInitials || 'U'}
            </span>
            <span className="hidden text-left text-sm sm:block">
              <span className="block font-medium text-ink-900 leading-tight">{user?.name}</span>
              <span className="block text-xs text-ink-500 leading-tight">{ROLE_LABELS[user?.role]}</span>
            </span>
            <FiChevronDown className="hidden text-ink-300 sm:block" size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-ink-100 bg-surface shadow-[var(--shadow-card-hover)]">
              <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-ink-700 hover:bg-canvas-dim">
                <FiUser size={15} /> Profile
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-coral-600 hover:bg-coral-100"
              >
                <FiLogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
