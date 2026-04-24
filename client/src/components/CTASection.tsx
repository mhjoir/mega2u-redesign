export default function CTASection() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/104258142/Zhc8zyasWmyoreu3Hi3Ktt/cta-background-Es84PhqUyhGm5b7zsXZHE9.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
  
          <div className="flex flex-col md:flex-row gap-4 justify-center">

                     </div>

          {/* Trust Info */}
          <div className="mt-2 pt-3 border-t-2 border-white/20">
            <p className="text-gray-300 mb-4">نحن نضمن:</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✅</span>
                <span>حسابات أصلية 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span>دفع آمن وموثوق</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>تفعيل فوري</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
