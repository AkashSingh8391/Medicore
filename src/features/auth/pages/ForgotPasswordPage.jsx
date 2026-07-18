import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { forgotPasswordSchema } from '../schemas/authSchemas';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/api/authService';

export function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } });

  const onSubmit = async (values) => {
    try {
      await authService.forgotPassword(values);
      setIsSent(true);
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (isSent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-vital-100 text-vital-600">
          <FiMail size={24} />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink-900">Check your email</h2>
        <p className="mt-2 text-sm text-ink-500">
          If an account exists for <span className="font-medium text-ink-700">{getValues('email')}</span>, we&apos;ve sent
          a link to reset your password.
        </p>
        <Link to="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clinical-700 hover:text-clinical-900">
          <FiArrowLeft size={14} /> Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Forgot your password?</h2>
      <p className="mt-1 text-sm text-ink-500">Enter your email and we&apos;ll send you a reset link.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="Email address" type="email" placeholder="you@hospital.com" error={errors.email?.message} {...register('email')} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>

      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-clinical-700 hover:text-clinical-900">
        <FiArrowLeft size={14} /> Back to sign in
      </Link>
    </div>
  );
}
