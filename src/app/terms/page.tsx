export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Terms & Conditions</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Vendora, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Vendor Guidelines</h2>
        <p>
          Vendors must adhere to our strict quality guidelines. Any violation may result in immediate suspension or termination of the vendor account.
        </p>
      </div>
    </div>
  );
}
