import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">OTP Verification</h1>
          <p className="text-sm text-muted-foreground mt-2">
            We've sent a 6-digit code to your email. Enter it below to verify your identity.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex justify-center gap-2">
             {/* Simple OTP input placeholder */}
             {[1,2,3,4,5,6].map((i) => (
                <Input key={i} className="w-12 h-14 text-center text-lg font-bold" maxLength={1} />
             ))}
          </div>

          <Button type="submit" className="w-full mt-6 h-11 rounded-full text-base">
            Verify Code
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Didn't receive the code?{' '}
          <button className="font-medium text-primary hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
