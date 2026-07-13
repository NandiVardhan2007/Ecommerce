"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2 } from 'lucide-react';
import { AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Customer' | 'Vendor'>('Customer');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthAPI.register({
        email,
        password,
        givenName,
        familyName,
        role
      });
      
      toast.success('Registration successful! Please check your email for the OTP.');
      router.push(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error('Registration error:', err);
      toast.error(err.message || 'An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your details below to create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role selector tab */}
          <div className="flex bg-secondary/50 p-1 rounded-full mb-2">
            <button
              type="button"
              onClick={() => setRole('Customer')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${role === 'Customer' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Sign up as Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('Vendor')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-full transition-all ${role === 'Vendor' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
            >
              Sign up as Vendor
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input 
                id="firstName" 
                placeholder="John" 
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                required 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-2 h-11 rounded-full text-base">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" type="button" className="w-full h-11 rounded-full text-base">
          Google
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
