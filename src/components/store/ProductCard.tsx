import Image from 'next/link';
// Wait, I should use next/image for images and next/link for links.
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: string;
  name: string;
  vendor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category?: string;
  description?: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border bg-card p-3 transition-all hover:shadow-lg hover:border-border/80">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary/50">
        {product.badge && (
          <Badge className="absolute top-2 left-2 z-10 font-medium bg-background text-foreground hover:bg-background">
            {product.badge}
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 z-10 font-medium">
            -{discount}%
          </Badge>
        )}
        
        {/* We use a simple div as a placeholder for the image to avoid next/image config issues for now */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Quick Actions overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 flex justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent">
           <Button size="sm" variant="secondary" className="w-full gap-2 font-medium">
             <ShoppingCart className="w-4 h-4" /> Add
           </Button>
        </div>
        
        <button className="absolute top-2 right-2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{product.vendor}</span>
          <div className="flex items-center gap-1 text-xs font-medium">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span>{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        
        <Link href={`/products/${product.id}`} className="font-semibold text-sm line-clamp-2 hover:underline">
          {product.name}
        </Link>
        
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="font-bold">₹{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
