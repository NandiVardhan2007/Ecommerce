'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Truck, ShieldCheck, Heart, ShoppingCart, Sparkles, ChevronRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductsAPI } from '@/lib/api';
import { Product } from '@/components/store/ProductCard';
import { toast } from 'sonner';

export default function ProductDetailsClient({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductsAPI.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Fetch product error:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    try {
      const cartStr = localStorage.getItem('cart');
      const cart = cartStr ? JSON.parse(cartStr) : [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success('Added to cart');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  const handleSave = () => {
    toast.success(`${product.name} saved to wishlist`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>{product.category || 'Category'}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.image || "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80"} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">{product.vendor}</span>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span>{product.rating || 5.0}</span>
                <span className="text-muted-foreground underline">({product.reviews || 0} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toFixed(2)}</span>
                  <Badge variant="destructive" className="ml-2">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>
            <p className="text-sm text-success font-medium">
              {product.stock && product.stock > 0 ? `In Stock (${product.stock} available)` : 'In Stock & Ready to Ship'}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button onClick={handleSave} size="lg" variant="outline" className="rounded-full px-8 gap-2">
              <Heart className="w-5 h-5" /> Save
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-5 h-5" /> Free Delivery by Tomorrow
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5" /> Secure Transaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
