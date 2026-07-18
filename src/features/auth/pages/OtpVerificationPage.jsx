import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/Button';
import { authService } from '../../../services/api/authService';

const OTP_LENGTH = 6;

export function OtpVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your registered email';

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] || ''));
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const otp = digits.join('');

  const handleVerify = async () => {
    if (otp.length !== OTP_LENGTH) {
      toast.error('Enter the full 6-digit code');
      return;
    }
    setIsVerifying(true);
    try {
      await authService.verifyOtp({ email, otp });
      toast.success('Email verified — you can now sign in');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    await authService.resendOtp({ email });
    toast.success('A new code has been sent');
    setResendCooldown(30);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-ink-900">Verify your email</h2>
      <p className="mt-1 text-sm text-ink-500">
        Enter the 6-digit code sent to <span className="font-medium text-ink-700">{email}</span>.
      </p>

      <div className="mt-8 flex justify-between gap-2" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            inputMode="numeric"
            maxLength={1}
            className="h-14 w-12 rounded-xl border border-ink-100 bg-surface text-center font-data text-xl text-ink-900 focus:border-clinical-500 focus:outline-none focus:ring-2 focus:ring-clinical-100"
          />
        ))}
      </div>

      <Button className="mt-8 w-full" onClick={handleVerify} isLoading={isVerifying}>
        Verify account
      </Button>

      <p className="mt-6 text-center text-sm text-ink-500">
        Didn&apos;t get the code?{' '}
        {resendCooldown > 0 ? (
          <span className="font-data text-ink-300">Resend in {resendCooldown}s</span>
        ) : (
          <button onClick={handleResend} className="font-medium text-clinical-700 hover:text-clinical-900">
            Resend code
          </button>
        )}
      </p>

      <p className="mt-4 rounded-xl border border-ink-100 bg-canvas-dim px-4 py-3 text-center text-xs text-ink-500">
        Demo code: <span className="font-data">123456</span>
      </p>
    </div>
  );
}
