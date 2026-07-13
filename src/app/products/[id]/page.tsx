import { Button } from '@/components/ui/button';
import { Star, Truck, ShieldCheck, Heart, ShoppingCart, Sparkles, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs Placeholder */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <span>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>Electronics</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Headphones</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80" 
              alt="Product" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-secondary rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80`} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">TechGadgets Official</span>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span>4.8</span>
                <span className="text-muted-foreground underline">(1,245 reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Sony WH-1000XM5 Wireless Noise Canceling Headphones
            </h1>
            
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold">₹29,999.00</span>
              <span className="text-lg text-muted-foreground line-through">₹34,999.00</span>
              <Badge variant="destructive" className="ml-2">Save 13%</Badge>
            </div>
            <p className="text-sm text-success font-medium">In Stock & Ready to Ship</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Industry-leading noise cancellation optimized to you. Magnificent Sound, engineered to perfection. Crystal clear hands-free calling. Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback).
          </p>

          <Separator />
          
          {/* AI Summary Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3">
             <div className="mt-1"><Sparkles className="w-5 h-5 text-primary" /></div>
             <div>
                <h4 className="font-semibold text-sm mb-1">AI Product Summary</h4>
                <p className="text-sm text-muted-foreground">Users praise the exceptional noise cancellation and battery life. Some note the carrying case is larger than previous models. Best for commuters and audiophiles.</p>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button size="lg" className="flex-1 rounded-full gap-2">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 gap-2">
              <Heart className="w-5 h-5" /> Save
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-5 h-5" /> Free Delivery by Tomorrow
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-5 h-5" /> 1 Year Manufacturer Warranty
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 pt-8 border-t">
        <Tabs defaultValue="description" className="w-full max-w-4xl">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-3">Reviews (1,245)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6 text-muted-foreground leading-relaxed">
            <p className="mb-4">
              The WH-1000XM5 headphones rewrite the rules for distraction-free listening. 2 processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.
            </p>
            <p>
              With a newly developed driver, DSEE - Extreme and Hires audio support, these headphones provide awe-inspiring audio quality.
            </p>
          </TabsContent>
          <TabsContent value="specifications" className="pt-6">
             <div className="grid grid-cols-2 gap-y-4 text-sm max-w-lg">
                <div className="text-muted-foreground">Brand</div>
                <div className="font-medium">Sony</div>
                <div className="text-muted-foreground">Model Name</div>
                <div className="font-medium">WH1000XM5/B</div>
                <div className="text-muted-foreground">Color</div>
                <div className="font-medium">Black</div>
                <div className="text-muted-foreground">Form Factor</div>
                <div className="font-medium">Over Ear</div>
                <div className="text-muted-foreground">Connectivity Technology</div>
                <div className="font-medium">Wireless</div>
             </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-6">
            <div className="text-center py-12 bg-secondary/20 rounded-2xl">
               <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
               <p className="text-muted-foreground">Placeholder for review section...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
