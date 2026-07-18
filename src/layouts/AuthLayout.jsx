import { Outlet, Link } from 'react-router-dom';
import { PulseLine } from '../components/ui/PulseLine';
import { FiActivity } from 'react-icons/fi';

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-clinical-900 p-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(20,184,146,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(20,125,143,0.5), transparent 50%)',
          }}
        />
        <Link to="/" className="relative z-10 flex items-center gap-2 font-display text-lg font-semibold">
          <FiActivity className="text-vital-500" size={22} />
          MediCore
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-4xl font-semibold leading-tight">
            Care coordination,<br />without the waiting room chaos.
          </h1>
          <p className="mt-4 text-sm text-clinical-100/80">
            One platform for patients, doctors, receptionists, and admins —
            appointments, records, and schedules that stay in sync in real time.
          </p>
        </div>

        <div className="relative z-10">
          <PulseLine />
          <p className="mt-2 text-xs uppercase tracking-wider text-clinical-100/60">
            Live system status — all services operational
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-canvas px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 font-display text-lg font-semibold text-ink-900 lg:hidden">
            <FiActivity className="text-vital-600" size={22} />
            MediCore
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
