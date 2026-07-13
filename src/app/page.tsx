"use client";

import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap, Truck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/store/ProductCard';
import { useState, useEffect } from 'react';
import { ProductsAPI } from '@/lib/api';

export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const products = await ProductsAPI.getProducts({ sortBy: 'recommended' });
        // Grab the first 4 for the homepage trending section
        setTrendingProducts(products.slice(0, 4));
      } catch (err) {
        console.error('Failed to fetch trending products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary/30 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-4 flex flex-col items-center text-center gap-6 md:gap-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium border text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Introducing the AI Shopping Assistant</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance animate-in fade-in slide-in-from-bottom-6 duration-700">
            Find exactly what you need, <br className="hidden md:block"/>
            <span className="text-muted-foreground">intelligently.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            Discover premium products from thousands of trusted vendors. 
            Powered by AI to help you make smarter purchasing decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Button size="lg" className="rounded-full px-8 h-14 text-base gap-2 w-full sm:w-auto">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-background w-full sm:w-auto">
              Become a Vendor
            </Button>
          </div>
          
        </div>
      </section>

      {/* Features/Benefits */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-3xl bg-secondary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Verified Vendors</h3>
            <p className="text-sm text-muted-foreground">Every seller on our platform is carefully vetted to ensure quality and authenticity.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-3xl bg-secondary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Get personalized product suggestions based on your preferences and natural language queries.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-3 p-6 rounded-3xl bg-secondary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Fast & Secure Delivery</h3>
            <p className="text-sm text-muted-foreground">Track your orders in real-time and enjoy reliable shipping directly from our vendor network.</p>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Trending Now</h2>
          </div>
          <Button variant="ghost" className="hidden sm:flex gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="w-full">
            View All Products
          </Button>
        </div>
      </section>
      
      {/* Category Pills Placeholder */}
      <section className="container mx-auto px-4">
         <h2 className="text-xl font-bold tracking-tight mb-6 text-center">Shop by Category</h2>
         <div className="flex flex-wrap items-center justify-center gap-3">
            {['Electronics', 'Fashion', 'Home & Garden', 'Beauty', 'Sports', 'Toys', 'Automotive', 'Groceries'].map((cat) => (
              <Button key={cat} variant="secondary" className="rounded-full">
                {cat}
              </Button>
            ))}
         </div>
      </section>
      
    </div>
  );
}
