'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';
import { AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setLoading(true);
    try {
      await AuthAPI.verifyOTP(otpCode, email);
      toast.success('Email verified successfully! You can now log in.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">OTP Verification</h1>
        <p className="text-sm text-muted-foreground mt-2">
          We've sent a 6-digit code to {email || 'your email'}. Enter it below to verify your identity.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-lg font-bold"
              maxLength={1}
            />
          ))}
        </div>

        <Button type="submit" className="w-full mt-6 h-11 rounded-full text-base" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Didn't receive the code?{' '}
        <button className="font-medium text-primary hover:underline">
          Resend
        </button>
      </p>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
