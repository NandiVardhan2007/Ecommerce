'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Settings,
  LayoutDashboard,
  Box,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductsAPI, AuthAPI } from '@/lib/api';
import { InventoryPieChart } from '@/components/analytics/InventoryPieChart';
import { SalesChart } from '@/components/analytics/SalesChart';

const MOCK_VENDOR_SALES = [
  { name: 'Mon', sales: 12000 },
  { name: 'Tue', sales: 19000 },
  { name: 'Wed', sales: 15000 },
  { name: 'Thu', sales: 22000 },
  { name: 'Fri', sales: 28000 },
  { name: 'Sat', sales: 35000 },
  { name: 'Sun', sales: 31000 },
];

export default function VendorDashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [vendorName, setVendorName] = useState('Vendor');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = AuthAPI.getCurrentUser();
        if (user) {
          setVendorName(user.businessName || `${user.givenName} ${user.familyName}`);
          const fetchedProducts = await ProductsAPI.getProducts({ vendorId: user.id });
          setProducts(fetchedProducts);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalProducts = products.length;
  // Compute total inventory value as a mock revenue proxy for now
  const inventoryValue = products.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0);

  // Compute inventory distribution by category
  const inventoryData = products.reduce((acc: any[], p) => {
    const existing = acc.find(item => item.name === (p.category || 'Other'));
    if (existing) {
      existing.value += (p.stock || 0);
    } else {
      acc.push({ name: p.category || 'Other', value: p.stock || 0 });
    }
    return acc;
  }, []);
  const displayInventoryData = inventoryData.length > 0 ? inventoryData : [{ name: 'No Products', value: 1 }];

  return (
    <div className="flex h-screen bg-background -mt-16">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card pt-16">
        <div className="p-6">
          <h2 className="font-bold text-lg tracking-tight">Vendor Portal</h2>
          <p className="text-sm text-muted-foreground mt-1">{vendorName}</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <ShoppingCart className="w-4 h-4 mr-2" /> Orders
            <div className="ml-auto bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full">0</div>
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
            <Link href="/vendor/dashboard/products/add">
              <Button className="rounded-full gap-2 shadow-md hover:shadow-lg transition-all">
                <Box className="w-4 h-4" /> Add Product
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
               <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                      <h3 className="text-2xl font-bold">₹{inventoryValue.toLocaleString()}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                      <h3 className="text-2xl font-bold">0</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                      <h3 className="text-2xl font-bold">{totalProducts}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Store Views</p>
                      <h3 className="text-2xl font-bold">0</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Revenue Trend</h3>
                  </div>
                  <SalesChart data={MOCK_VENDOR_SALES} height={250} />
                </div>
                
                <div className="p-6 border rounded-3xl bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Inventory Distribution</h3>
                  </div>
                  <InventoryPieChart data={displayInventoryData} height={250} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                {/* Your Products Table */}
                <div className="col-span-2 p-6 border rounded-3xl bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Your Products</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  
                  {products.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>You haven't added any products yet.</p>
                      <Link href="/vendor/dashboard/products/add">
                        <Button variant="link" className="text-primary mt-2">Create your first product</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground border-b">
                          <tr>
                            <th className="pb-3 font-medium">Product</th>
                            <th className="pb-3 font-medium">Category</th>
                            <th className="pb-3 font-medium">Stock</th>
                            <th className="pb-3 font-medium text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {products.slice(0, 5).map((p) => (
                            <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                              <td className="py-4 font-medium">{p.name}</td>
                              <td className="py-4">{p.category}</td>
                              <td className="py-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${p.stock > 0 ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                                  {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                                </span>
                              </td>
                              <td className="py-4 text-right font-medium">₹{p.price.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* AI Insights */}
                <div className="flex flex-col gap-6">
                  <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold">AI Insights</h3>
                    </div>
                    {totalProducts > 0 ? (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your store currently has {totalProducts} active products. Adding detailed descriptions to your items will help our AI Shopping Assistant recommend them more frequently to buyers.
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Start by adding products to your store. Our AI will analyze your inventory to provide intelligent pricing and marketing recommendations.
                      </p>
                    )}
                    <Link href="/vendor/dashboard/products/add">
                      <Button variant="outline" className="w-full mt-4 rounded-full bg-background">
                        Add More Products
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
          
        </div>
      </main>
    </div>
  );
}
