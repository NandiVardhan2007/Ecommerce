"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';
import { CartAPI, AuthAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const fetchCart = async () => {
    // Check authentication
    const user = AuthAPI.getCurrentUser();
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const cart = await CartAPI.getCart();
      setCartItems(cart.items || []);
    } catch (err: any) {
      console.error('Fetch cart error:', err);
      toast.error('Failed to load cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const syncCart = async (updatedItems: any[]) => {
    try {
      await CartAPI.updateCart(updatedItems);
    } catch (err) {
      console.error('Failed to sync cart with backend:', err);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    syncCart(updated);
  };

  const removeItem = (productId: string) => {
    const updated = cartItems.filter(item => item.productId !== productId);
    setCartItems(updated);
    syncCart(updated);
    toast.success('Item removed from cart');
  };

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'VENDORA10') {
      setDiscount(0.1); // 10% discount
      toast.success('10% discount applied successfully!');
    } else {
      toast.error('Invalid coupon code. Try VENDORA10');
    }
  };

  const user = typeof window !== 'undefined' ? AuthAPI.getCurrentUser() : null;

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 150;
  const tax = parseFloat(((subtotal - discountAmount) * 0.18).toFixed(2));
  const total = subtotal - discountAmount + shipping + tax;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium text-sm">Loading your cart...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">Please sign in to view and manage your shopping cart.</p>
        </div>
        <Link href="/login" className="w-full">
          <Button size="lg" className="w-full rounded-full">Sign In to Continue</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="border rounded-3xl bg-secondary/15 py-16 px-4 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              Add products from our marketplace catalog to get started.
            </p>
          </div>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex gap-4 p-4 border rounded-2xl bg-card">
                <div className="w-24 h-24 bg-secondary rounded-xl overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Vendor: {item.vendor || 'Vendora Partner'}</p>
                    </div>
                    <div className="font-bold text-lg">₹{item.price.toLocaleString()}</div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-medium text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="h-8 w-8 rounded-full"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[350px] shrink-0">
            <div className="p-6 border rounded-3xl bg-card flex flex-col gap-6 sticky top-24">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping Estimate</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div className="flex gap-2">
                <Input 
                  placeholder="Discount code" 
                  className="rounded-full" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <Button variant="secondary" onClick={handleApplyCoupon} className="rounded-full">Apply</Button>
              </div>
              
              <Link href="/checkout">
                <Button size="lg" className="w-full rounded-full gap-2">
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
