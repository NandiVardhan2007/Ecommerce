'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, Loader2 } from 'lucide-react';
import { AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function VendorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await AuthAPI.login({ email, password });
      
      if (res.user?.role !== 'Vendor' && res.user?.role !== 'Admin') {
        throw new Error('Unauthorized access. This portal is for vendors only.');
      }

      toast.success(res.message || 'Logged in successfully!');
      router.push('/vendor/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      toast.error(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12 relative overflow-hidden group">
        
        {/* Subtle decorative background */}
        <div className="absolute top-0 left-0 -ml-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
        
        <div className="flex flex-col items-center text-center mb-8 relative">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 ring-4 ring-primary/5">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Login</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Access your seller dashboard to manage products and orders
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Business Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="vendor@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline underline-offset-4">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl"
              required 
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4 h-12 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing In...
              </>
            ) : (
              'Sign In to Dashboard'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8 relative">
          Want to become a seller?{' '}
          <Link href="/vendor/register" className="font-medium text-primary hover:underline underline-offset-4">
            Apply here
          </Link>
        </p>
      </div>
    </div>
  );
}
