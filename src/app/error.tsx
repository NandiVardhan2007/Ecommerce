'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="flex flex-col items-center text-center max-w-md p-8 border rounded-3xl bg-card">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-muted-foreground text-sm mb-6">
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>
        <Button onClick={() => reset()} className="rounded-full">
          Try again
        </Button>
      </div>
    </div>
  );
}
