import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">About Vendora</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <p className="text-lg">
          Vendora is a next-generation multi-vendor e-commerce platform designed to bridge the gap between premium sellers and discerning buyers. Our mission is to provide a seamless, intelligent shopping experience powered by cutting-edge AI technology.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">Our Vision</h2>
        <p>
          We envision a marketplace where finding the perfect product is as easy as having a conversation. By integrating AI at every step—from personalized recommendations to smart semantic search—we are revolutionizing how people discover and purchase goods online.
        </p>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-4">For Sellers</h2>
        <p>
          Vendora empowers businesses of all sizes to reach a global audience. Our comprehensive vendor dashboard provides real-time analytics, AI-driven insights, and streamlined inventory management, allowing you to focus on what you do best: creating great products.
        </p>
        <div className="mt-12 p-8 bg-secondary/50 rounded-3xl text-center">
           <h3 className="text-xl font-bold text-foreground mb-4">Join the Revolution</h3>
           <p className="mb-6">Start selling on Vendora today and tap into a new era of e-commerce.</p>
           <Button size="lg" className="rounded-full px-8">Become a Vendor</Button>
        </div>
      </div>
    </div>
  );
}
