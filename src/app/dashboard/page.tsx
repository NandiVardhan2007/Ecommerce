import { Package, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CustomerDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back, John!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-3xl bg-card flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">3 Active Orders</h3>
          <p className="text-sm text-muted-foreground">Track your recent purchases</p>
          <Link href="/dashboard/orders" className="mt-2 text-sm font-medium text-primary hover:underline">
            View orders
          </Link>
        </div>
        <div className="p-6 border rounded-3xl bg-card flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">12 Saved Items</h3>
          <p className="text-sm text-muted-foreground">Items you've added to wishlist</p>
          <Link href="/wishlist" className="mt-2 text-sm font-medium text-primary hover:underline">
            View wishlist
          </Link>
        </div>
        <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">AI Suggested</h3>
          <p className="text-sm text-muted-foreground">Personalized picks for you</p>
          <Link href="/products" className="mt-2 text-sm font-medium text-primary hover:underline">
            See recommendations
          </Link>
        </div>
      </div>

      <div className="p-6 border rounded-3xl bg-card">
         <div className="flex items-center justify-between mb-6">
           <h3 className="text-lg font-bold">Recent Orders</h3>
           <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm">View All</Button>
           </Link>
         </div>
         <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 border rounded-xl">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg shrink-0"></div>
                  <div>
                     <p className="font-medium">Sony WH-1000XM5</p>
                     <p className="text-xs text-muted-foreground">Order #123456 • Delivered on Oct 24</p>
                  </div>
               </div>
               <Button variant="outline" size="sm" className="rounded-full">Buy Again</Button>
            </div>
         </div>
      </div>
    </div>
  );
}
