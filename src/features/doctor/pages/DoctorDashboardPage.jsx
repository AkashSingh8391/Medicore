import { FiUsers, FiCalendar, FiClock, FiActivity } from 'react-icons/fi';
import { StatCard } from '../../../components/common/StatCard';
import { Card } from '../../../components/ui/Card';
import { useAuth } from '../../../hooks/useAuth';

export function DoctorDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Good morning, {user?.name}</h1>
        <p className="mt-1 text-sm text-ink-500">{user?.department} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's patients" value="12" icon={FiUsers} accent="clinical" trend="+3 vs yesterday" />
        <StatCard label="Appointments" value="9" icon={FiCalendar} accent="vital" />
        <StatCard label="Avg. consult time" value="14 min" icon={FiClock} accent="amber" />
        <StatCard label="Patient satisfaction" value="4.8/5" icon={FiActivity} accent="coral" />
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink-900">Patient queue</h2>
        <div className="mt-4 divide-y divide-ink-100">
          {[
            { name: 'Ramesh Yadav', time: '10:00 AM', status: 'Waiting' },
            { name: 'Sunita Sharma', time: '10:20 AM', status: 'Waiting' },
            { name: 'Vikram Rathore', time: '10:40 AM', status: 'Checked in' },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between py-3 text-sm">
              <span className="font-medium text-ink-900">{p.name}</span>
              <span className="text-ink-500">{p.time}</span>
              <span className="rounded-full bg-vital-100 px-3 py-1 text-xs font-medium text-vital-600">{p.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
