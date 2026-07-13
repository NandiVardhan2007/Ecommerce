import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Settings,
  LayoutDashboard,
  Box,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function VendorDashboardPage() {
  return (
    <div className="flex h-screen bg-background -mt-16">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card pt-16">
        <div className="p-6">
          <h2 className="font-bold text-lg tracking-tight">Vendor Portal</h2>
          <p className="text-sm text-muted-foreground mt-1">TechGadgets Store</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <ShoppingCart className="w-4 h-4 mr-2" /> Orders
            <div className="ml-auto bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">5</div>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Box className="w-4 h-4 mr-2" /> Products
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Package className="w-4 h-4 mr-2" /> Inventory
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <MessageSquare className="w-4 h-4 mr-2" /> Questions
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <TrendingUp className="w-4 h-4 mr-2" /> Analytics
          </Button>
        </nav>
        <div className="p-4 mt-auto">
          <Separator className="mb-4" />
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 pt-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
              <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
            </div>
            <Button className="rounded-full gap-2">
              <Box className="w-4 h-4" /> Add Product
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">₹10,45,000</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                  <h3 className="text-2xl font-bold">+250</h3>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Store Views</p>
                  <h3 className="text-2xl font-bold">3,240</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            {/* Recent Orders Table */}
            <div className="col-span-2 p-6 border rounded-3xl bg-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-muted-foreground border-b">
                    <tr>
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-secondary/20 transition-colors">
                        <td className="py-4">#ORD-{1000 + i}</td>
                        <td className="py-4">Jane Doe</td>
                        <td className="py-4">Sony WH-1000XM5</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                            Completed
                          </span>
                        </td>
                        <td className="py-4 text-right font-medium">₹29,999.00</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* AI Insights */}
            <div className="flex flex-col gap-6">
              <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">AI Insights</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your "Sony WH-1000XM5" product has seen a 25% increase in views over the last 48 hours. Consider running a flash sale to maximize conversion.
                </p>
                <Button variant="outline" className="w-full mt-4 rounded-full bg-background">
                  Create Promotion
                </Button>
              </div>

              <div className="p-6 border rounded-3xl bg-card">
                <h3 className="text-lg font-bold mb-4">Low Stock Alerts</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Apple Watch Series 9</span>
                     <span className="text-xs font-bold text-destructive">2 left</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Ceramic Coffee Mug</span>
                     <span className="text-xs font-bold text-destructive">5 left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
