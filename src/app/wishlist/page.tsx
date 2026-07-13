import { Button } from '@/components/ui/button';
import { ProductCard, Product } from '@/components/store/ProductCard';

const wishlistProducts: Product[] = [
  { id: "p1", name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", vendor: "TechGadgets", price: 348.00, originalPrice: 399.99, rating: 4.8, reviews: 1245, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", badge: "Bestseller" },
  { id: "p4", name: "Nike Air Max 270 React", vendor: "SneakerHub", price: 160.00, rating: 4.6, reviews: 543, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" }
];

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">2 items saved for later</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
