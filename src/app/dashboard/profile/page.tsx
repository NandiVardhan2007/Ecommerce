import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CustomerProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Information</h1>
        <p className="text-muted-foreground mt-1">Update your personal details here.</p>
      </div>

      <div className="max-w-2xl p-6 border rounded-3xl bg-card">
         <form className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
               <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">JD</div>
               <Button variant="outline" className="rounded-full">Change Avatar</Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue="John" />
               </div>
               <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue="Doe" />
               </div>
            </div>
            
            <div className="flex flex-col gap-2">
               <label className="text-sm font-medium">Email Address</label>
               <Input defaultValue="john.doe@example.com" type="email" />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-medium">Phone Number</label>
               <Input defaultValue="+1 (555) 000-0000" type="tel" />
            </div>

            <div className="pt-4 border-t flex justify-end">
               <Button className="rounded-full">Save Changes</Button>
            </div>
         </form>
      </div>
    </div>
  );
}
