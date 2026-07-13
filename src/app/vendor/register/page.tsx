import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store } from 'lucide-react';

export default function VendorRegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="w-full max-w-lg p-8 rounded-3xl border bg-card shadow-sm mt-12 mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Become a Vendor</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Submit your application to start selling on Vendora
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">First Name</label>
              <Input placeholder="John" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input placeholder="Doe" required />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Business Name</label>
            <Input placeholder="Acme Corp" required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Business Email</label>
            <Input type="email" placeholder="contact@acme.com" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" required />
          </div>

          <Button type="submit" className="w-full mt-2 h-11 rounded-full text-base">
            Submit Application
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already a vendor?{' '}
          <Link href="/vendor/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
