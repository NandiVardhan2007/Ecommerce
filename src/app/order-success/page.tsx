import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-4">
      <div className="flex flex-col items-center text-center max-w-lg p-12 border rounded-3xl bg-card shadow-sm">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Thank you for your purchase. Your order <span className="font-semibold text-foreground">#ORD-123456</span> has been confirmed. We've sent an email with the order details and tracking information.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
           <Link href="/dashboard/orders" className="flex-1">
              <Button className="w-full rounded-full h-12 text-base">Track Order</Button>
           </Link>
           <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full rounded-full h-12 text-base">Continue Shopping</Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
