'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Upload, 
  Loader2,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductsAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function AddProductPage() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await ProductsAPI.createProduct({
        name,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        category,
        description,
        stock: parseInt(stock, 10),
        image: imageUrl || undefined,
      });

      toast.success('Product added successfully!');
      router.push('/vendor/dashboard');
    } catch (err: any) {
      console.error('Failed to create product:', err);
      toast.error(err.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md h-16 flex items-center px-6">
        <Link href="/vendor/dashboard">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
          <Box className="w-5 h-5 text-primary" /> Add New Product
        </h1>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Details */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="p-6 border rounded-3xl bg-card shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
                
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sony Wireless Headphones" 
                      className="rounded-xl"
                      required 
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <textarea 
                      id="description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your product..." 
                      className="min-h-[120px] p-3 rounded-xl border bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border rounded-3xl bg-card shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="price" className="text-sm font-medium">Selling Price (₹)</label>
                    <Input 
                      id="price" 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="999.00" 
                      className="rounded-xl"
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="originalPrice" className="text-sm font-medium">Original Price (₹) <span className="text-muted-foreground font-normal">(Optional)</span></label>
                    <Input 
                      id="originalPrice" 
                      type="number" 
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="1299.00" 
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="stock" className="text-sm font-medium">Stock Quantity</label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="100" 
                    className="rounded-xl max-w-[200px]"
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="flex flex-col gap-6">
              <div className="p-6 border rounded-3xl bg-card shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Organization</h2>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Input 
                    id="category" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Electronics, Fashion" 
                    className="rounded-xl"
                    required 
                  />
                </div>
              </div>

              <div className="p-6 border rounded-3xl bg-card shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Product Image</h2>
                
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center text-muted-foreground bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-sm font-medium text-foreground">Click to upload</span>
                    <span className="text-xs mt-1">SVG, PNG, JPG (max. 2MB)</span>
                  </div>

                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="imageUrl" className="text-sm font-medium">Image URL</label>
                    <Input 
                      id="imageUrl" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg" 
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
            <Link href="/vendor/dashboard">
              <Button type="button" variant="ghost" className="rounded-full px-6">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={loading} className="rounded-full px-8 shadow-md">
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                'Publish Product'
              )}
            </Button>
          </div>
          
        </form>
      </main>
    </div>
  );
}