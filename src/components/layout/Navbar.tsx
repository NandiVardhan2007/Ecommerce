'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Heart, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 gap-4 md:gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">VENDORA</span>
        </Link>

        {/* Categories */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/products?category=Electronics" className="hover:text-foreground transition-colors">Electronics</Link>
          <Link href="/products?category=Fashion" className="hover:text-foreground transition-colors">Fashion</Link>
          <Link href="/products?category=Home" className="hover:text-foreground transition-colors">Home</Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 flex items-center justify-center hidden sm:flex gap-2">
          <form onSubmit={handleSearch} className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 rounded-full bg-secondary border-none focus-visible:ring-1"
            />
          </form>
          <Link href="/ai">
            <Button variant="outline" className="rounded-full gap-2 border-primary/20 text-primary hover:bg-primary/5 shadow-sm">
              <Sparkles className="h-4 w-4" /> Ask AI
            </Button>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          <Link href="/vendor/register" className="hidden lg:flex text-sm font-medium hover:underline underline-offset-4 mr-2 text-muted-foreground">
            Become a Vendor
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative mr-2">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                0
              </Badge>
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-2 border-l pl-4">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">Log in</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">Sign up</Button>
            </Link>
          </div>

          {/* Mobile Auth (Icon only) */}
          <Link href="/login" className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

      </div>
    </header>
  );
}
