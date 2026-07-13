import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Address</h1>
      <div className="mt-8 p-12 border border-dashed rounded-3xl flex flex-col items-center justify-center text-center bg-secondary/20">
         <h2 className="text-xl font-semibold mb-2">Module Under Construction</h2>
         <p className="text-muted-foreground mb-6">This section of the Vendora platform is being actively developed as part of our phased rollout.</p>
         <Button variant="outline" className="rounded-full">Notify Me</Button>
      </div>
    </div>
  );
}