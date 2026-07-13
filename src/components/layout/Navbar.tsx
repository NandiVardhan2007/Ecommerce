import Link from 'next/link';
import { Search, ShoppingCart, Heart, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 gap-4 md:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">VENDORA</span>
        </Link>

        {/* Categories (Desktop only for simplicity right now) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/products?category=electronics" className="hover:text-foreground transition-colors">Electronics</Link>
          <Link href="/products?category=fashion" className="hover:text-foreground transition-colors">Fashion</Link>
          <Link href="/products?category=home" className="hover:text-foreground transition-colors">Home</Link>
        </nav>

        {/* Search Bar with AI hint */}
        <div className="flex-1 flex items-center justify-center hidden sm:flex">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search or ask AI (e.g., 'laptop under ₹70,000')..." 
              className="w-full pl-9 pr-10 rounded-full bg-secondary border-none focus-visible:ring-1"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-primary hover:text-primary/80 transition-colors">
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 ml-auto sm:ml-0">
          <Link href="/vendor" className="hidden lg:flex text-sm font-medium hover:underline underline-offset-4">
            Become a Vendor
          </Link>
          
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex">
            <Heart className="h-5 w-5" />
          </Button>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                3
              </Badge>
            </Button>
          </Link>

          <Link href="/login">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}
