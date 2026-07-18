import { FiCalendar, FiFileText, FiCreditCard, FiHeart } from 'react-icons/fi';
import { StatCard } from '../../../components/common/StatCard';
import { Card } from '../../../components/ui/Card';
import { EmptyState } from '../../../components/common/EmptyState';
import { useAuth } from '../../../hooks/useAuth';

export function PatientDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="mt-1 text-sm text-ink-500">Here's what's happening with your care.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Upcoming appointments" value="2" icon={FiCalendar} accent="clinical" trend="Next: tomorrow, 10:30 AM" trendDirection="up" />
        <StatCard label="Active prescriptions" value="3" icon={FiFileText} accent="vital" />
        <StatCard label="Pending payments" value="₹1,200" icon={FiCreditCard} accent="amber" />
        <StatCard label="Favourite doctors" value="4" icon={FiHeart} accent="coral" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-ink-900">Upcoming appointments</h2>
          <div className="mt-4 space-y-3">
            {[
              { doctor: 'Dr. Neha Kapoor', dept: 'Cardiology', time: 'Tomorrow, 10:30 AM' },
              { doctor: 'Dr. Aman Gupta', dept: 'Dermatology', time: 'Fri, 4:00 PM' },
            ].map((appt) => (
              <div key={appt.doctor} className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink-900">{appt.doctor}</p>
                  <p className="text-xs text-ink-500">{appt.dept}</p>
                </div>
                <span className="rounded-full bg-clinical-100 px-3 py-1 text-xs font-medium text-clinical-700">
                  {appt.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-lg font-semibold text-ink-900">Health timeline</h2>
          <div className="mt-4">
            <EmptyState
              title="Timeline coming in Phase 2"
              description="Vitals, visits, and prescriptions will appear here as a chronological history."
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
