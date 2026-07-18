import { FiUserPlus, FiCalendar, FiCreditCard, FiClock } from 'react-icons/fi';
import { StatCard } from '../../../components/common/StatCard';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function ReceptionistDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900">Front desk overview</h1>
        <p className="mt-1 text-sm text-ink-500">Manage today's walk-ins, bookings, and queue.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Walk-ins today" value="7" icon={FiUserPlus} accent="clinical" />
        <StatCard label="Bookings today" value="24" icon={FiCalendar} accent="vital" />
        <StatCard label="Bills pending" value="5" icon={FiCreditCard} accent="amber" />
        <StatCard label="Avg. wait time" value="11 min" icon={FiClock} accent="coral" />
      </div>

      <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900">Need to register a walk-in?</h2>
          <p className="mt-1 text-sm text-ink-500">Start a new patient registration or book a slot for an existing patient.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Book appointment</Button>
          <Button>Register walk-in</Button>
        </div>
      </Card>
    </div>
  );
}
