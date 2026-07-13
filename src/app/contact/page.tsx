import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-muted-foreground text-lg">We'd love to hear from you. Please fill out this form or use our contact information below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="flex flex-col gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
               <Mail className="w-5 h-5 text-foreground" />
            </div>
            <div>
               <h3 className="font-semibold text-lg">Email Support</h3>
               <p className="text-muted-foreground mt-1">support@vendora.com</p>
               <p className="text-muted-foreground">vendors@vendora.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
               <Phone className="w-5 h-5 text-foreground" />
            </div>
            <div>
               <h3 className="font-semibold text-lg">Phone</h3>
               <p className="text-muted-foreground mt-1">+1 (555) 123-4567</p>
               <p className="text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
               <MapPin className="w-5 h-5 text-foreground" />
            </div>
            <div>
               <h3 className="font-semibold text-lg">Headquarters</h3>
               <p className="text-muted-foreground mt-1">123 Commerce Avenue, Suite 400<br/>New York, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card border p-8 rounded-3xl">
           <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                 </div>
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium">Email</label>
                 <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-sm font-medium">Message</label>
                 <textarea 
                    className="flex min-h-[120px] w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="How can we help you?"
                 />
              </div>
              <Button size="lg" className="w-full mt-4 rounded-full">Send Message</Button>
           </form>
        </div>
      </div>
    </div>
  );
}
