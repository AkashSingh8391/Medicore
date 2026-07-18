import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema } from '../schemas/authSchemas';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../../hooks/useAuth';
import { ROLE_HOME_ROUTE } from '../../../constants/roles';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (values) => {
    try {
      const user = await login(values);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}`);
      const redirectTo = location.state?.from?.pathname || ROLE_HOME_ROUTE[user.role] || '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Sign in</h2>
      <p className="mt-1 text-sm text-ink-500">Enter your credentials to access your dashboard.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@hospital.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-ink-300 text-clinical-700 focus:ring-clinical-500"
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-medium text-clinical-700 hover:text-clinical-900">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <div className="mt-6 rounded-xl border border-ink-100 bg-canvas-dim px-4 py-3 text-xs text-ink-500">
        Demo accounts (password: <span className="font-data">password123</span>) —{' '}
        patient@medicore.com · doctor@medicore.com · reception@medicore.com · admin@medicore.com
      </div>

      <p className="mt-6 text-center text-sm text-ink-500">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-medium text-clinical-700 hover:text-clinical-900">
          Create one
        </Link>
      </p>
    </div>
  );
}
