import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

/**
 * MEGA2U - منصة ميجا الرقمية
 * 
 * Design Philosophy: Modern Bold
 * - Color Scheme: Black (#1a1a1a) + White (#ffffff) + Bold Orange (#ff6b35)
 * - Typography: Poppins Bold for headings, Inter Regular for body
 * - Layout: Asymmetric with strategic whitespace
 * - Interactions: Sharp, immediate transitions and hover effects
 */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Sticky Navigation */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Products Section */}
        <ProductsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
