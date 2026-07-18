import { FiUsers, FiTrendingUp, FiActivity, FiPieChart } from 'react-icons/fi';
import { StatCard } from '../../../components/common/StatCard';
import { Card } from '../../../components/ui/Card';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Hospital overview</h1>
        <p className="mt-1 text-sm text-ink-500">System-wide statistics across all departments.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total patients" value="8,412" icon={FiUsers} accent="clinical" trend="+124 this month" />
        <StatCard label="Active doctors" value="86" icon={FiActivity} accent="vital" />
        <StatCard label="Monthly revenue" value="₹42.6L" icon={FiTrendingUp} accent="amber" trend="+8.2%" />
        <StatCard label="Departments" value="14" icon={FiPieChart} accent="coral" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-semibold text-ink-900">Appointments per department</h2>
          <p className="mt-1 text-sm text-ink-500">Chart component (Recharts) wired here in Phase 2.</p>
        </Card>
        <Card>
          <h2 className="font-display text-lg font-semibold text-ink-900">Revenue trend</h2>
          <p className="mt-1 text-sm text-ink-500">Chart component (Recharts) wired here in Phase 2.</p>
        </Card>
      </div>
    </div>
  );
}
