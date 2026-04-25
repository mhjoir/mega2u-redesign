import { Send, ChevronLeft, ShieldCheck, Lock, Zap } from "lucide-react";

/**
 * Kinguin-style CTA (RTL)
 * شريط CTA داكن مع شارات الثقة والأزرار الرئيسية.
 */
export default function CTASection() {
  const telegramLink = "https://t.me/mega2u_support";

  return (
    <section
      id="contact"
      className="py-14 md:py-20 bg-white font-['Cairo']"
      dir="rtl"
    >
      <div className="kg-container">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-white"
          style={{
            background:
              "linear-gradient(120deg, #011627 0%, #0f3460 60%, #ff6b35 130%)",
          }}
        >
          {/* عناصر زخرفية */}
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#ff6b35]/20 rounded-full blur-3xl" />
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#0088cc]/15 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* النص + الأزرار */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-black mb-4">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                ابدأ رحلتك الرقمية الآن
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-3">
                جاهز للحصول على أفضل العروض الرقمية؟
              </h2>
              <p className="text-sm md:text-base text-gray-200 mb-6 max-w-2xl leading-relaxed">
                تواصل معنا الآن عبر تيليجرام أو تصفّح الخدمات لاختيار الباقة
                المناسبة لك مع ضمان كامل وتفعيل فوري.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#products" className="kg-btn kg-btn-primary text-sm">
                  تسوّق الآن
                  <ChevronLeft className="w-4 h-4" />
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="kg-btn !bg-white !text-[#011627] hover:!bg-gray-100 text-sm"
                >
                  <Send className="w-4 h-4 -rotate-45" />
                  تواصل عبر تيليجرام
                </a>
              </div>
            </div>

            {/* بطاقات الضمانات */}
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-sm font-bold">حسابات أصلية 100%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#ff6b35]/20 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-[#ff6b35]" />
                </div>
                <div className="text-sm font-bold">دفع آمن وموثوق</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-sm font-bold">تفعيل فوري</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
