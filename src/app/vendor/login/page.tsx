import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store } from 'lucide-react';

export default function VendorLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Vendor Login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Access your seller dashboard
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Business Email</label>
            <Input id="email" type="email" placeholder="vendor@example.com" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>

          <Link href="/vendor/dashboard" className="w-full mt-2">
             <Button type="button" className="w-full h-11 rounded-full text-base">
               Sign In to Dashboard
             </Button>
          </Link>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Want to become a seller?{' '}
          <Link href="/vendor/register" className="font-medium text-primary hover:underline">
            Apply here
          </Link>
        </p>
      </div>
    </div>
  );
}
