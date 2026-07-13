import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email address and we'll send you an OTP to reset your password.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <Link href="/verify">
             <Button type="button" className="w-full mt-2 h-11 rounded-full text-base">
               Send OTP
             </Button>
          </Link>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Remembered your password?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
