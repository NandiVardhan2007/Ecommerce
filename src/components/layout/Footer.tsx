import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight">VENDORA</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The modern AI-powered multi-vendor marketplace. Discover premium products with intelligent recommendations.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Shop</h4>
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            <Link href="/products?category=deals" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Today's Deals</Link>
            <Link href="/products?category=new" className="text-sm text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Sell</h4>
            <Link href="/vendor" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vendor Portal</Link>
            <Link href="/vendor/register" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Become a Seller</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Legal</h4>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vendora Marketplace. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholders */}
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">X</div>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">IG</div>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors">IN</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
