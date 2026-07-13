"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CartAPI, OrdersAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Address fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateField, setStateField] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  // Payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const fetchCart = async () => {
    try {
      const cart = await CartAPI.getCart();
      setCartItems(cart.items || []);
      if (!cart.items || cart.items.length === 0) {
        toast.error('Your cart is empty. Cannot checkout.');
        router.push('/cart');
      }
    } catch (err: any) {
      console.error('Fetch cart error:', err);
      toast.error('Failed to load checkout details.');
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !stateField || !zipCode) {
      toast.error('Please complete all shipping address fields.');
      return;
    }

    setSubmitting(true);
    try {
      const shippingAddress = {
        name: `${firstName} ${lastName}`,
        line1: address,
        city,
        state: stateField,
        zip: zipCode,
      };

      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        vendorId: item.vendorId,
        vendor: item.vendor,
      }));

      const shippingCost = deliveryMethod === 'express' ? 500 : 0;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = parseFloat((subtotal * 0.18).toFixed(2));
      const totalAmount = subtotal + shippingCost + tax;

      const res = await OrdersAPI.createOrder({
        shippingAddress,
        items: orderItems,
        totalAmount,
      });

      toast.success('Order placed successfully!');
      router.push('/order-success');
    } catch (err: any) {
      console.error('Order creation error:', err);
      toast.error(err.message || 'Failed to place order. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculations
  const shippingCost = deliveryMethod === 'express' ? 500 : 0;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = parseFloat((subtotal * 0.18).toFixed(2));
  const total = subtotal + shippingCost + tax;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium text-sm">Preparing checkout...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Shipping Address */}
          <section className="p-6 border rounded-3xl bg-card">
            <h2 className="text-xl font-bold mb-6">1. Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium">Address</label>
                <Input placeholder="123 Main St, Apt 4B" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">State</label>
                <Input placeholder="NY" value={stateField} onChange={(e) => setStateField(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">ZIP Code</label>
                <Input placeholder="10001" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="p-6 border rounded-3xl bg-card">
            <h2 className="text-xl font-bold mb-6">2. Delivery Method</h2>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="flex flex-col gap-4">
              <div className="flex items-center space-x-3 border p-4 rounded-xl cursor-pointer hover:bg-secondary/50">
                <RadioGroupItem value="standard" id="standard" />
                <div className="flex-1 flex justify-between">
                  <label htmlFor="standard" className="font-medium cursor-pointer">Standard Delivery (3-5 Days)</label>
                  <span className="font-medium">Free</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 border p-4 rounded-xl cursor-pointer hover:bg-secondary/50">
                <RadioGroupItem value="express" id="express" />
                <div className="flex-1 flex justify-between">
                  <label htmlFor="express" className="font-medium cursor-pointer">Express Delivery (Next Day)</label>
                  <span className="font-medium">₹500.00</span>
                </div>
              </div>
            </RadioGroup>
          </section>

          {/* Payment */}
          <section className="p-6 border rounded-3xl bg-card">
            <h2 className="text-xl font-bold mb-6">3. Payment</h2>
            <div className="flex flex-col gap-4">
              <div className="col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium">Card Number</label>
                <Input placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">CVC</label>
                  <Input placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} required />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="save-card" />
                <label htmlFor="save-card" className="text-sm font-medium leading-none">
                  Save this card for future payments
                </label>
              </div>
            </div>
          </section>

        </div>

        {/* Order Summary sidebar */}
        <div className="w-full lg:w-[350px] shrink-0">
          <div className="p-6 border rounded-3xl bg-card flex flex-col gap-6 sticky top-24">
            <h2 className="text-xl font-bold">Review Order</h2>
            
            <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-secondary rounded-md overflow-hidden shrink-0">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <Separator />

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
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
            
            <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full mt-2">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
