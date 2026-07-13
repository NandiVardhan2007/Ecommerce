const fs = require('fs');
const path = require('path');

const pages = [
  'dashboard/orders', 'dashboard/tracking', 'dashboard/notifications', 'dashboard/address', 'dashboard/payment', 'dashboard/settings',
  'search',
  'vendor/dashboard/analytics', 'vendor/dashboard/products', 'vendor/dashboard/products/add', 'vendor/dashboard/products/edit/[id]',
  'vendor/dashboard/inventory', 'vendor/dashboard/orders', 'vendor/dashboard/questions', 'vendor/dashboard/coupons', 'vendor/dashboard/profile', 'vendor/dashboard/settings',
  'admin/login', 'admin/dashboard/customers', 'admin/dashboard/vendors', 'admin/dashboard/products', 'admin/dashboard/categories', 'admin/dashboard/reports', 'admin/dashboard/revenue', 'admin/dashboard/reviews', 'admin/dashboard/ai-analytics', 'admin/dashboard/settings'
];

pages.forEach(p => {
  const dir = path.join('src/app', p);
  fs.mkdirSync(dir, { recursive: true });
  // Make a nice title
  let segments = p.split('/');
  if (segments[segments.length - 1].startsWith('[')) {
     segments.pop(); // remove dynamic segment from title
  }
  const title = segments.map(w => w.charAt(0).toUpperCase() + w.slice(1).replace('-', ' ')).join(' ');
  const code = `
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight">${title}</h1>
      <div className="mt-8 p-12 border border-dashed rounded-3xl flex flex-col items-center justify-center text-center bg-secondary/20">
         <h2 className="text-xl font-semibold mb-2">Module Under Construction</h2>
         <p className="text-muted-foreground mb-6">This section of the Vendora platform is being actively developed as part of our phased rollout.</p>
         <Button variant="outline" className="rounded-full">Notify Me</Button>
      </div>
    </div>
  );
}
  `;
  fs.writeFileSync(path.join(dir, 'page.tsx'), code.trim());
});
console.log('Pages generated successfully!');
