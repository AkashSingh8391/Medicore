import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { Button } from '../components/ui/Button';

export function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <FiShield size={24} />
      </span>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink-900">Access restricted</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        Your account role doesn't have permission to view this page.
      </p>
      <Button as={Link} to="/" className="mt-6">
        Go to dashboard
      </Button>
    </div>
  );
}
