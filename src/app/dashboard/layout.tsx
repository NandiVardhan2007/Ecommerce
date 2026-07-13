import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="p-6 border rounded-3xl bg-card mb-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-bold text-lg">
                   JD
                </div>
                <div>
                   <h3 className="font-semibold">John Doe</h3>
                   <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
             </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <LayoutDashboard className="w-4 h-4 mr-2" /> Overview
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Package className="w-4 h-4 mr-2" /> My Orders
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <User className="w-4 h-4 mr-2" /> Profile
              </Button>
            </Link>
            <Link href="/dashboard/address">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <MapPin className="w-4 h-4 mr-2" /> Addresses
              </Button>
            </Link>
            <Link href="/dashboard/payment">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <CreditCard className="w-4 h-4 mr-2" /> Payment Methods
              </Button>
            </Link>
            <Link href="/dashboard/notifications">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Bell className="w-4 h-4 mr-2" /> Notifications
              </Button>
            </Link>
            <Separator className="my-2" />
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Button>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
