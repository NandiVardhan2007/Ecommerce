import { 
  Users, 
  Store, 
  AlertTriangle, 
  BarChart, 
  Settings,
  LayoutDashboard,
  ShieldAlert,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function AdminDashboardPage() {
  return (
    <div className="flex h-screen bg-background -mt-16">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card pt-16">
        <div className="p-6">
          <h2 className="font-bold text-lg tracking-tight">Admin Console</h2>
          <p className="text-sm text-muted-foreground mt-1">Superadmin</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <LayoutDashboard className="w-4 h-4 mr-2" /> Overview
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Users className="w-4 h-4 mr-2" /> Customers
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Store className="w-4 h-4 mr-2" /> Vendors
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <ShieldAlert className="w-4 h-4 mr-2" /> Moderation
            <div className="ml-auto bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full">12</div>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <Bot className="w-4 h-4 mr-2" /> AI Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <BarChart className="w-4 h-4 mr-2" /> Platform Reports
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
              <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
              <p className="text-muted-foreground mt-1">System-wide metrics and health status.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-success/20 text-success">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              All Systems Operational
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total GMV</p>
                  <h3 className="text-2xl font-bold">₹10.24Cr</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <h3 className="text-2xl font-bold">3,420</h3>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <h3 className="text-2xl font-bold">142K</h3>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged Reviews</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            
            <div className="p-6 border rounded-3xl bg-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Vendor Applications</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-secondary/20 transition-colors">
                     <div>
                        <h4 className="font-semibold text-sm">Tech Store {i}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Applied 2 hours ago</p>
                     </div>
                     <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="rounded-full text-xs">Reject</Button>
                        <Button size="sm" className="rounded-full text-xs">Approve</Button>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-primary/20 bg-primary/5 rounded-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold">AI Platform Analytics</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The AI Shopping Assistant has handled 14,500 queries today with a 92% resolution rate. Conversion rate for users interacting with AI is 3x higher than average.
                </p>
                <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%]" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                   <span>Resolution Rate</span>
                   <span>92%</span>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </main>
    </div>
  );
}
