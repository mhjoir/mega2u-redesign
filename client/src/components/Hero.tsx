export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/104258142/Zhc8zyasWmyoreu3Hi3Ktt/hero-background-bTxmM7ywaLTUZi5uuginaM.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-[#ff6b35] rounded-full">
            <span className="text-white font-bold text-sm">🎉 عالمك الرقمي في مكان واحد</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            أفضل الاشتراكات الترفيهية
            <span className="block text-[#ff6b35] mt-2">بأسعار منافسة</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-100 mb-12 leading-relaxed">
            احصل على جميع خدمات البث والترفيه بأسعار لا تُصدق مع ضمان ذهبي وتفعيل فوري
          </p>

          {/* Trust Badges */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="font-semibold">حسابات أصلية 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="font-semibold">دفع آمن وموثوق</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-semibold">تفعيل فوري</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-sm font-semibold">اسحب للأسفل</span>
          <svg className="w-6 h-6 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}