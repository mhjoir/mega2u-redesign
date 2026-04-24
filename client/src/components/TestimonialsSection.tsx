import { testimonials } from '@/lib/products';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            آراء عملائنا
          </h2>
          <p className="text-lg text-[#666666] max-w-2xl mx-auto">
            اسمع من عملائنا الراضين عن خدماتنا
          </p>
          <div className="section-divider"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-items">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="stagger-item bg-white rounded-lg border-2 border-[#e0e0e0] p-8 hover:border-[#ff6b35] hover:shadow-lg transition-all duration-300 hover-lift"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#ff6b35] text-[#ff6b35]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#666666] mb-6 text-lg">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t-2 border-[#e0e0e0] pt-4">
                <p className="font-bold text-[#1a1a1a]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-[#0f3460]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
