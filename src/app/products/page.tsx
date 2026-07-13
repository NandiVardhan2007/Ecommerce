"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard, Product } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { ProductsAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Suspense } from 'react';

function ProductListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recommended');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Assemble query params
      const params: Record<string, any> = {
        sortBy,
        q: initialSearch || undefined,
      };

      // Since the local API lists products, we filter them locally/regionally
      if (selectedCategories.length === 1) {
        params.category = selectedCategories[0];
      }

      let res = await ProductsAPI.getProducts(params);

      // Apply price filter locally or get range
      if (selectedPrices.length > 0) {
        res = res.filter((p: Product) => {
          return selectedPrices.some(range => {
            if (range === 'Under ₹5,000') return p.price < 5000;
            if (range === '₹5,000 - ₹10,000') return p.price >= 5000 && p.price <= 10000;
            if (range === '₹10,000 - ₹50,000') return p.price >= 10000 && p.price <= 50000;
            if (range === 'Over ₹50,000') return p.price > 50000;
            return true;
          });
        });
      }

      // If multiple categories are checked, filter them
      if (selectedCategories.length > 1) {
        res = res.filter((p: Product) => selectedCategories.includes(p.category || ''));
      }

      setProducts(res);
    } catch (err: any) {
      console.error('Fetch products error:', err);
      toast.error('Failed to load products. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams, selectedCategories, selectedPrices, sortBy]);

  const handleCategoryChange = (cat: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, cat]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== cat));
    }
  };

  const handlePriceChange = (range: string, checked: boolean) => {
    if (checked) {
      setSelectedPrices(prev => [...prev, range]);
    } else {
      setSelectedPrices(prev => prev.filter(r => r !== range));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {initialSearch ? `Search Results for "${initialSearch}"` : 'All Products'}
          </h1>
          <p className="text-muted-foreground mt-1">Showing {products.length} results</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={(val) => setSortBy(val || 'recommended')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex flex-col gap-6 shrink-0 hidden md:flex">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="flex flex-col gap-3">
              {['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports'].map(cat => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cat-${cat}`} 
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={(checked) => handleCategoryChange(cat, !!checked)}
                  />
                  <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none cursor-pointer">
                    {cat}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="flex flex-col gap-3">
              {['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹50,000', 'Over ₹50,000'].map(range => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`price-${range}`} 
                    checked={selectedPrices.includes(range)}
                    onCheckedChange={(checked) => handlePriceChange(range, !!checked)}
                  />
                  <label htmlFor={`price-${range}`} className="text-sm font-medium leading-none cursor-pointer">
                    {range}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium text-sm">Fetching products from server...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border rounded-3xl bg-secondary/15 text-center px-4">
              <h3 className="text-lg font-bold">No products found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Try clearing your filters or search keywords to explore other products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-24"><Loader2 className="animate-spin" /></div>}>
      <ProductListingContent />
    </Suspense>
  );
}
