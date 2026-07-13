import Link from 'next/link';
import { Store, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function VendorPortalPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6 md:gap-8">
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance animate-in fade-in slide-in-from-bottom-6 duration-700">
            Grow your business with <br className="hidden md:block"/>
            <span className="text-primary-foreground/70">Vendora.</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl text-balance animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Reach millions of shoppers. Leverage AI to optimize your listings, track inventory, and boost your sales like never before.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/vendor/register">
               <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto bg-background text-foreground hover:bg-background/90">
                 Start Selling Today <ArrowRight className="w-4 h-4" />
               </Button>
            </Link>
            <Link href="/vendor/login">
               <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                 Login to Dashboard
               </Button>
            </Link>
          </div>
          
        </div>
      </section>

      {/* Features/Benefits */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-3 p-8 rounded-3xl border bg-card">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-xl">Powerful Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">Access real-time sales data and AI-driven insights to understand customer behavior and optimize pricing.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-8 rounded-3xl border bg-card">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-4">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-xl">AI Integration</h3>
            <p className="text-muted-foreground leading-relaxed">Let our AI assistant help customers find your products through natural language search and smart recommendations.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-8 rounded-3xl border bg-card">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-foreground mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-semibold text-xl">Secure Payments</h3>
            <p className="text-muted-foreground leading-relaxed">Enjoy fast, reliable payouts and comprehensive fraud protection for all transactions on the platform.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
