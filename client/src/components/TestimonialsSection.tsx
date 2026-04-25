import { testimonials } from "@/lib/products";
import { Star, Quote, MessageSquare } from "lucide-react";

/**
 * Kinguin-style Testimonials (RTL)
 * شبكة بطاقات بيضاء أنيقة على خلفية رمادية فاتحة.
 * تم الحفاظ على البيانات من @/lib/products بدون تعديل.
 */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-14 md:py-20 bg-[#f5f6fa] font-['Cairo']"
      dir="rtl"
    >
      <div className="kg-container">
        {/* رأس القسم */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0088cc]/10 text-[#0088cc] rounded-full px-3 py-1 text-xs font-black mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            آراء عملائنا
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#011627] mb-3">
            ماذا يقول عملاؤنا
          </h2>

          {/* ملخّص التقييم العام */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#e7eaf3] rounded-xl px-4 py-2 mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-black text-[#011627]">4.9/5</span>
            <span className="text-xs text-gray-500">— بناءً على آراء العملاء</span>
          </div>
        </div>

        {/* شبكة الآراء */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((t: any, index: number) => (
            <div key={index} className="kg-card p-6 relative group">
              <Quote className="absolute top-5 left-5 w-7 h-7 text-[#ff6b35]/15 -scale-x-100" />

              {/* النجوم */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#ff6b35] text-[#ff6b35]"
                  />
                ))}
              </div>

              {/* النص */}
              <p className="text-sm text-gray-700 leading-relaxed mb-5 min-h-[60px]">
                {t.text}
              </p>

              {/* الفاصل */}
              <div className="kg-divider mb-4" />

              {/* المؤلّف */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] flex items-center justify-center text-white font-black text-base shrink-0">
                  {(t.name || "?").charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-[#011627] truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
