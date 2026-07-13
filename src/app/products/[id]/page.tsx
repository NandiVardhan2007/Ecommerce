import ProductDetailsClient from './ProductDetailsClient';

export function generateStaticParams() {
  // Return an empty array so no dynamic pages are generated at build time.
  // With output: 'export', Next.js needs this to be defined for dynamic segments.
  return [];
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailsClient id={id} />;
}
