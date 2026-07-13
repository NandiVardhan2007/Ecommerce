'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound, Loader2, ArrowRight } from 'lucide-react';
import { AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthAPI.forgotPassword(email);
      toast.success('If an account exists, a reset code was sent to your email.');
      setStep('reset');
    } catch (err: any) {
      console.error('Request reset error:', err);
      // Still move to step 2 for security reasons (don't reveal if account exists)
      toast.success('If an account exists, a reset code was sent to your email.');
      setStep('reset');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthAPI.confirmForgotPassword({ email, code, newPassword });
      toast.success('Password successfully reset! Please log in with your new password.');
      router.push('/login');
    } catch (err: any) {
      console.error('Confirm reset error:', err);
      toast.error(err.message || 'Invalid code or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12 relative overflow-hidden group">
        
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
        
        <div className="flex flex-col items-center text-center mb-8 relative">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 ring-4 ring-primary/5">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {step === 'request' ? 'Reset Password' : 'Enter Reset Code'}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            {step === 'request' 
              ? 'Enter your email and we will send you instructions to reset your password.' 
              : `We've sent a code to ${email}. Check your inbox and enter it below.`}
          </p>
        </div>

        {step === 'request' ? (
          <form onSubmit={handleRequestReset} className="flex flex-col gap-5 relative">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
                required 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2 h-12 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Send Reset Code <ArrowRight className="ml-2 w-4 h-4" /></>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset} className="flex flex-col gap-5 relative">
            <div className="flex flex-col gap-2">
              <label htmlFor="code" className="text-sm font-medium">Reset Code</label>
              <Input 
                id="code" 
                type="text" 
                placeholder="123456" 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-xl tracking-widest text-center text-lg"
                required 
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl"
                required 
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-2 h-12 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Set New Password'
              )}
            </Button>
          </form>
        )}

        <div className="mt-8 flex justify-center relative">
          <Link href="/login" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
