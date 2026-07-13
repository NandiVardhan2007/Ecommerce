export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading Vendora...</p>
      </div>
    </div>
  );
}
