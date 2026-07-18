import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { PulseLine } from '../components/ui/PulseLine';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <span className="font-data text-sm font-medium text-ink-300">ERROR 404</span>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ink-900">This page flatlined.</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="my-8 w-48 opacity-60">
        <PulseLine />
      </div>
      <Button as={Link} to="/">
        <FiArrowLeft size={15} /> Back to safety
      </Button>
    </div>
  );
}
