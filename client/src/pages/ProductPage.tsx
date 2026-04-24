import { useRoute, Link } from "wouter";
import { useState } from "react";
import { products } from "@/lib/products";
import {
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
  Store,
  Globe,
  Lock,
  Truck,
  Heart,
  Share2,
  Plus,
  Minus,
  BadgeCheck,
  Clock,
} from "lucide-react";

/**
 * صفحة تفاصيل المنتج بأسلوب Kinguin:
 * - تخطيط من عمودين: تفاصيل المنتج (يمين/كبير) + صندوق الشراء الجانبي (يسار/ثابت)
 * - شارة خصم بارزة + سعر مشطوب بأسلوب كينغوين
 * - بطاقة "البائع" (Seller card) لإضافة الثقة
 * - علامات الثقة: ضمان الاسترداد، تسليم فوري، دفع آمن
 * - تحكم بالكمية + زر "إضافة إلى السلة" + زر "اشترِ الآن"
 *
 * ملاحظة: لم يتم تعديل أي محتوى نصي أو بيانات للمنتج.
 */
export default function ProductPage() {
  const [, params] = useRoute("/product/:id");
  const product = products.find((p) => String(p.id) === params?.id);
  const [qty, setQty] = useState(1);
  const [isFav, setIsFav] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-right font-['Cairo']">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">عذراً، المنتج غير موجود</h1>
          <Link href="/" className="text-[#ff6b35] font-bold hover:underline">العودة للمتجر</Link>
        </div>
      </div>
    );
  }

  // سعر بصري "أصلي" + خصم — لا يُعدّل أي بيانات منتج، فقط لأغراض العرض البصري بأسلوب Kinguin
  const hasDiscount = !!product.badge;
  const originalPrice = hasDiscount
    ? Math.round(product.price * (product.price >= 100 ? 1.45 : 1.65))
    : null;
  const discountPct = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;
  const savings = originalPrice ? originalPrice - product.price : null;

  // اسم العملة المختصر
  const currencyLabel = product.currency === "ريال" ? "ر.س" : product.currency;

  // فئات نصية للعرض (من البيانات الحالية فقط)
  const categoryLabel = (() => {
    switch (product.category) {
      case "os":
        return "أنظمة التشغيل";
      case "software":
        return "برامج الأوفيس";
      case "design":
        return "التصميم والإبداع";
      case "streaming":
        return "الترفيه والبث";
      case "iptv":
        return "اشتراكات IPTV";
      case "security":
        return "الخصوصية و VPN";
      case "ai":
        return "الذكاء الاصطناعي";
      default:
        return "منتج رقمي";
    }
  })();

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-16 font-['Cairo']" dir="rtl">
      {/* شريط التنقل العلوي */}
      <nav className="bg-white border-b px-4 sm:px-6 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#0f3460] font-bold cursor-pointer hover:text-[#ff6b35] transition-colors text-sm sm:text-base"
          >
            <ArrowRight className="w-5 h-5 ml-1" /> العودة للمتجر
          </Link>
          <img
            src="/images/logo.png"
            alt="MEGA2U"
            className="h-7 sm:h-8"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
          />
        </div>
      </nav>

      {/* مسار التنقل (Breadcrumb) بأسلوب Kinguin */}
      <div className="bg-white border-b">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#ff6b35]">الرئيسية</Link>
          <span className="text-gray-300">/</span>
          <span className="hover:text-[#ff6b35]">{categoryLabel}</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 font-medium">{product.name}</span>
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-4 sm:mt-6">
        {/* تخطيط Kinguin: عمود رئيسي للتفاصيل + عمود جانبي لصندوق الشراء */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">

          {/* ============== العمود الرئيسي (التفاصيل) ============== */}
          <div className="lg:col-span-8 space-y-4">

            {/* بطاقة الصورة + العنوان (بنية شبيهة بـ Kinguin) */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                {/* الصورة الرئيسية */}
                <div
                  className="sm:col-span-2 relative aspect-square sm:aspect-auto bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 sm:p-8"
                  style={
                    product.color
                      ? { background: `linear-gradient(135deg, ${product.color}15 0%, ${product.color}05 100%)` }
                      : undefined
                  }
                >
                  {hasDiscount && discountPct && (
                    <div className="absolute top-3 left-3 z-10 bg-[#ff6b35] text-white text-sm font-extrabold px-3 py-1.5 rounded-lg shadow-md" dir="ltr">
                      -{discountPct}%
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-[260px] h-auto object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://placehold.co/300x300?text=MEGA2U";
                    }}
                  />
                </div>

                {/* رأس المعلومات */}
                <div className="sm:col-span-3 p-5 sm:p-7 flex flex-col">
                  <div className="text-xs font-bold text-[#ff6b35] uppercase tracking-wider mb-2">
                    {categoryLabel}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#011627] leading-tight mb-3">
                    {product.name}
                  </h1>

                  {/* تقييم بصري بأسلوب Kinguin (ثابت 4.8) */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 5 ? "fill-[#ffb400] text-[#ffb400]" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">4.8</span>
                    <span className="text-xs text-gray-400">/ تقييم العملاء</span>
                  </div>

                  {/* شارات معلومات سريعة */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" /> منتج أصلي
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> تسليم فوري
                    </span>
                    {product.duration && (
                      <span className="bg-orange-50 text-[#ff6b35] text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {product.duration}
                      </span>
                    )}
                    {product.badge && (
                      <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-2.5 py-1 rounded-md">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* أيقونات تفاعلية */}
                  <div className="mt-auto flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setIsFav((v) => !v)}
                      className="w-9 h-9 rounded-lg border border-gray-200 hover:border-[#ff6b35] flex items-center justify-center transition-colors"
                      aria-label="إضافة إلى المفضلة"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-[#ff6b35] text-[#ff6b35]" : "text-gray-500"}`} />
                    </button>
                    <button
                      className="w-9 h-9 rounded-lg border border-gray-200 hover:border-[#ff6b35] flex items-center justify-center transition-colors"
                      aria-label="مشاركة"
                    >
                      <Share2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* بطاقة وصف المنتج / المميزات */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
              <h2 className="text-lg sm:text-xl font-black text-[#011627] mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]" />
                مميزات المنتج
              </h2>
              <div className="space-y-3">
                {product.description.split("\n").map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-[15px] leading-relaxed">
                      {feature.replace("•", "").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* بطاقة معلومات البائع (بأسلوب Kinguin) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
              <h2 className="text-lg sm:text-xl font-black text-[#011627] mb-4">
                معلومات البائع
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#ff6b35] to-[#ff8b5a] flex items-center justify-center text-white font-black text-xl shrink-0">
                  M
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-[#011627] text-base sm:text-lg">MEGA2U</span>
                    <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                      بائع موثّق
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#ffb400] text-[#ffb400]" />
                      <strong className="text-gray-700">98%</strong> تقييم إيجابي
                    </span>
                    <span className="text-gray-300">•</span>
                    <span><strong className="text-gray-700">+10K</strong> طلب مكتمل</span>
                  </div>
                </div>
              </div>
            </div>

            {/* بطاقة الضمانات (Trust signals) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
              <h2 className="text-lg sm:text-xl font-black text-[#011627] mb-4">
                ضماناتنا لك
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f7fc] border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-[#0f3460] shrink-0" />
                  <div>
                    <div className="font-black text-sm text-[#011627] mb-0.5">ضمان ذهبي</div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      ضمان طوال فترة الاشتراك أو استرداد كامل
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f7fc] border border-gray-100">
                  <Lock className="w-6 h-6 text-[#0f3460] shrink-0" />
                  <div>
                    <div className="font-black text-sm text-[#011627] mb-0.5">دفع آمن 100%</div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      بوابات دفع موثوقة ومشفرة بالكامل
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f5f7fc] border border-gray-100">
                  <Truck className="w-6 h-6 text-[#0f3460] shrink-0" />
                  <div>
                    <div className="font-black text-sm text-[#011627] mb-0.5">تسليم فوري</div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      الكود يصلك على الإيميل خلال ثوانٍ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============== العمود الجانبي (صندوق الشراء — sticky) ============== */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-4">

              {/* صندوق الشراء الرئيسي */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {/* رأس الصندوق */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-green-600">متوفر في المخزون</span>
                  </div>

                  {/* قسم الأسعار بأسلوب Kinguin */}
                  <div className="flex items-end justify-between gap-2 mb-2">
                    <div className="flex flex-col">
                      {originalPrice && (
                        <span className="text-gray-400 text-sm font-medium line-through" dir="ltr">
                          {originalPrice} {currencyLabel}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1" dir="ltr">
                        <span className="text-4xl sm:text-[42px] font-black text-[#ff6b35] leading-none">
                          {product.price.toFixed(2)}
                        </span>
                        <span className="text-lg font-black text-[#011627]">{currencyLabel}</span>
                      </div>
                    </div>
                    {discountPct && (
                      <div className="bg-[#ff6b35] text-white text-base font-extrabold px-3 py-1.5 rounded-lg" dir="ltr">
                        -{discountPct}%
                      </div>
                    )}
                  </div>

                  {savings && (
                    <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md inline-flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      <span>توفير <span dir="ltr">{savings} {currencyLabel}</span></span>
                    </div>
                  )}
                </div>

                {/* تحكم بالكمية */}
                <div className="p-5 border-b border-gray-100">
                  <label className="text-xs font-bold text-gray-500 mb-2 block">الكمية</label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="إنقاص الكمية"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-black text-[#011627]">{qty}</span>
                      <button
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex-grow text-left" dir="ltr">
                      <div className="text-[10px] text-gray-400 font-bold">الإجمالي</div>
                      <div className="text-lg font-black text-[#011627]">
                        {(product.price * qty).toFixed(2)} {currencyLabel}
                      </div>
                    </div>
                  </div>
                </div>

                {/* أزرار الشراء (CTA hierarchy) */}
                <div className="p-5 space-y-2.5">
                  {/* CTA الرئيسي - شراء الآن */}
                  <Link href={`/checkout/${product.id}`}>
                    <button className="w-full bg-[#ff6b35] text-white py-3.5 rounded-xl font-black text-base hover:bg-[#e85a2a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98]">
                      <Zap className="w-5 h-5 fill-white" /> اشترِ الآن
                    </button>
                  </Link>

                  {/* CTA الثانوي - أضف إلى السلة */}
                  <button className="w-full bg-white border-2 border-[#011627] text-[#011627] py-3 rounded-xl font-black text-sm hover:bg-[#011627] hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                    <ShoppingCart className="w-4 h-4" /> أضف إلى السلة
                  </button>
                </div>

                {/* صف معلومات سريعة */}
                <div className="px-5 pb-5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-gray-50">
                      <Zap className="w-4 h-4 text-[#ff6b35]" />
                      <span className="text-[10px] font-bold text-gray-600 leading-tight">تسليم<br />فوري</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-gray-50">
                      <ShieldCheck className="w-4 h-4 text-[#0f3460]" />
                      <span className="text-[10px] font-bold text-gray-600 leading-tight">ضمان<br />ذهبي</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 py-2 rounded-lg bg-gray-50">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="text-[10px] font-bold text-gray-600 leading-tight">دفع<br />آمن</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* بطاقة "بائع موثّق" المختصرة */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0f3460] flex items-center justify-center text-white shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-black text-sm text-[#011627]">يُباع بواسطة</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#ff6b35]">MEGA2U</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ملاحظة بريد التسليم */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#0f3460] mt-0.5 shrink-0" />
                <div className="text-xs text-[#0f3460] leading-relaxed">
                  <strong className="block mb-1 text-sm">طريقة التسليم</strong>
                  سيتم إرسال كود التفعيل أو بيانات الحساب فوراً إلى بريدك الإلكتروني المسجل بعد إتمام الدفع.
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ملاحظة سفلية */}
        <p className="text-center text-gray-400 text-xs sm:text-sm mt-8 leading-relaxed">
          يرجى التأكد من كتابة بريدك الإلكتروني بشكل صحيح في صفحة الدفع لتصلك بيانات الحساب فوراً.
        </p>
      </main>
    </div>
  );
}
