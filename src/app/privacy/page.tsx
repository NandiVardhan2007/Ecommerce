export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including your name, email address, shipping address, and payment information when you register or make a purchase.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
        <p>
          We use the information we collect to process transactions, provide customer support, personalize your shopping experience (including AI recommendations), and communicate with you about products and promotions.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
        </p>
      </div>
    </div>
  );
}
