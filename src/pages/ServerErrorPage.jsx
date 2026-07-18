import { FiAlertTriangle } from 'react-icons/fi';
import { Button } from '../components/ui/Button';

export function ServerErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coral-100 text-coral-600">
        <FiAlertTriangle size={24} />
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        Our servers hit a snag. Try reloading — if this keeps happening, contact support.
      </p>
      <Button onClick={() => window.location.reload()} className="mt-6">
        Reload page
      </Button>
    </div>
  );
}
