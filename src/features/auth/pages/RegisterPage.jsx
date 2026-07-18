import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerSchema } from '../schemas/authSchemas';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/api/authService';
import { ROLE_LABELS, ROLES } from '../../../constants/roles';

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: ROLES.PATIENT,
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values) => {
    try {
      await authService.register(values);
      toast.success('Account created — verify your email to continue');
      navigate('/verify-otp', { state: { email: values.email } });
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Create your account</h2>
      <p className="mt-1 text-sm text-ink-500">Set up access for your role on the platform.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Full name" placeholder="Akash Singh" error={errors.fullName?.message} {...register('fullName')} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Email address" type="email" placeholder="you@hospital.com" error={errors.email?.message} {...register('email')} />
          <Input label="Phone number" placeholder="+91 98765 43210" error={errors.phone?.message} {...register('phone')} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-700">I am a</label>
          <select
            className="w-full rounded-xl border border-ink-100 bg-surface px-3.5 py-2.5 text-sm text-ink-900 focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-100"
            {...register('role')}
          >
            {Object.values(ROLES).map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
          {errors.role && <p className="mt-1.5 text-xs text-coral-600">{errors.role.message}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Password" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
          <Input label="Confirm password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        </div>

        <label className="flex items-start gap-2 text-sm text-ink-700">
          <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-ink-300 text-clinical-700 focus:ring-clinical-500" {...register('agreeToTerms')} />
          <span>
            I agree to the <span className="font-medium text-clinical-700">Terms of Service</span> and{' '}
            <span className="font-medium text-clinical-700">Privacy Policy</span>.
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-xs text-coral-600">{errors.agreeToTerms.message}</p>}

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-clinical-700 hover:text-clinical-900">
          Sign in
        </Link>
      </p>
    </div>
  );
}
