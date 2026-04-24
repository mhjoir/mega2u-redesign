import { features } from '@/lib/products';

const featureIcons = ['💰', '⚡', '🛡️'];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/104258142/Zhc8zyasWmyoreu3Hi3Ktt/features-background-T55Fropgc5vFJzLvKxNp5J.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            لماذا تختار MEGA2U؟
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            نحن نقدم أفضل الخدمات والمميزات لعملائنا الكرام
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-items">
          {features.map((feature, index) => (
            <div
              key={index}
              className="stagger-item bg-white/10 backdrop-blur-md border-2 border-[#ff6b35] rounded-lg p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">
                {featureIcons[index] || '✨'}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">

        </div>
      </div>
    </section>
  );
}
