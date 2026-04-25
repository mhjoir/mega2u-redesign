import { ShieldCheck, Zap, Lock, Star, ChevronLeft, Tag } from "lucide-react";

/**
 * Kinguin-style Hero (RTL)
 * تخطيط: شبكة 12 عمود
 *   - يسار (col-span-8): بانر رئيسي كبير مع عنوان + CTA + شارات ثقة
 *   - يمين (col-span-4): بانرين عموديين (عرض اليوم + ضمان ميجا)
 *
 * تم الحفاظ على المحتوى النصي من النسخة السابقة:
 *   - "أفضل الاشتراكات الترفيهية بأسعار منافسة"
 *   - شارات: حسابات أصلية 100% / دفع آمن وموثوق / تفعيل فوري
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="bg-[#f5f6fa] py-6 md:py-10 font-['Cairo']"
      dir="rtl"
    >
      <div className="kg-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* ================ البانر الرئيسي ================ */}
          <div
            className="lg:col-span-8 relative overflow-hidden rounded-2xl min-h-[320px] md:min-h-[380px]"
            style={{
              backgroundImage:
                "url(https://d2xsxph8kpxj0f.cloudfront.net/104258142/Zhc8zyasWmyoreu3Hi3Ktt/hero-background-bTxmM7ywaLTUZi5uuginaM.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay متدرج */}
            <div className="absolute inset-0 bg-gradient-to-l from-[#011627]/90 via-[#011627]/70 to-[#011627]/30" />

            {/* المحتوى */}
            <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-center">
              {/* شارة علوية */}
              <div className="inline-flex items-center gap-2 self-start bg-[#ff6b35] text-white px-3 py-1.5 rounded-full mb-4 text-xs font-black">
                <Tag className="w-3.5 h-3.5" />
                <span>عالمك الرقمي في مكان واحد</span>
              </div>

              {/* العنوان */}
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-2xl mb-3">
                أفضل الاشتراكات الترفيهية
                <br />
                <span className="text-[#ff6b35]">بأسعار منافسة</span>
              </h1>

              {/* الوصف */}
              <p className="text-sm md:text-base text-gray-200 leading-relaxed mb-6 max-w-xl">
                احصل على جميع خدمات البث والترفيه بأسعار لا تُصدق مع ضمان ذهبي
                وتفعيل فوري
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-6">
                <a href="#products" className="kg-btn kg-btn-primary text-sm">
                  تسوّق الآن
                  <ChevronLeft className="w-4 h-4" />
                </a>
                <a
                  href="#features"
                  className="kg-btn !bg-white/10 !border !border-white/20 !text-white hover:!bg-white/20 text-sm"
                >
                  لماذا MEGA2U؟
                </a>
              </div>

              {/* شارات ثقة */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white">
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>حسابات أصلية 100%</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Lock className="w-4 h-4 text-[#ff6b35]" />
                  <span>دفع آمن وموثوق</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>تفعيل فوري</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================ البانرات الجانبية ================ */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* بانر 1 — عرض اليوم */}
            <a
              href="#products"
              className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-[#ff6b35] to-[#e85a2a] p-5 min-h-[150px] flex flex-col justify-between text-white group"
            >
              <div>
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-black mb-2">
                  <Zap className="w-3 h-3" />
                  عرض اليوم
                </div>
                <h3 className="text-lg font-black leading-tight">
                  خصومات تصل إلى
                  <br />
                  <span className="text-3xl font-black">‎-50%</span>
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold opacity-90 group-hover:translate-x-1 transition-transform">
                تصفّح العروض
                <ChevronLeft className="w-4 h-4" />
              </div>
              {/* عنصر زخرفي */}
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
            </a>

            {/* بانر 2 — ضمان ميجا */}
            <div className="relative overflow-hidden rounded-2xl bg-[#011627] border border-white/10 p-5 min-h-[150px] flex flex-col justify-between text-white">
              <div>
                <div className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 rounded-full px-2.5 py-1 text-[10px] font-black mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  ضمان ميجا
                </div>
                <h3 className="text-base font-black leading-tight">
                  تقييم العملاء
                  <br />
                  <span className="text-[#ff6b35]">+10,000 طلب ناجح</span>
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-xs font-black mr-1">4.9/5</span>
              </div>
              <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-[#ff6b35]/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
