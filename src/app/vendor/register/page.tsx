'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, Loader2 } from 'lucide-react';
import { AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        businessName, // The backend currently doesn't store business name separately, but we can pass it if we ever update the schema.
        role: 'Vendor'
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
      <div className="w-full max-w-lg p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12 relative overflow-hidden group">
        
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
        
        <div className="flex flex-col items-center text-center mb-8 relative">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 ring-4 ring-primary/5">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Become a Vendor</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Join thousands of successful sellers and grow your business on Vendora
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <Input 
                id="firstName"
                placeholder="John" 
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                className="rounded-xl"
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
                className="rounded-xl"
                required 
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="business" className="text-sm font-medium">Business Name</label>
            <Input 
              id="business"
              placeholder="Acme Corp" 
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="rounded-xl"
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Business Email</label>
            <Input 
              id="email"
              type="email" 
              placeholder="contact@acme.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl"
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
              className="rounded-xl"
              required 
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4 h-12 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Application...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8 relative">
          Already a vendor?{' '}
          <Link href="/vendor/login" className="font-medium text-primary hover:underline underline-offset-4">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
