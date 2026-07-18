import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPasswordSchema } from '../schemas/authSchemas';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/api/authService';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema), defaultValues: { newPassword: '', confirmPassword: '' } });

  const onSubmit = async (values) => {
    try {
      await authService.resetPassword({ token, newPassword: values.newPassword });
      toast.success('Password updated — please sign in');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Could not reset password. The link may have expired.');
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Set a new password</h2>
      <p className="mt-1 text-sm text-ink-500">Choose a strong password you haven&apos;t used before.</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input label="New password" type="password" placeholder="••••••••" error={errors.newPassword?.message} {...register('newPassword')} />
        <Input label="Confirm new password" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Reset password
        </Button>
      </form>
    </div>
  );
}
