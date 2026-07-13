import ProductDetailsClient from './ProductDetailsClient';

export function generateStaticParams() {
  // Return an empty array so no dynamic pages are generated at build time.
  // With output: 'export', Next.js needs this to be defined for dynamic segments.
  return [];
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return <ProductDetailsClient id={params.id} />;
}
