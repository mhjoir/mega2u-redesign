import { useRoute, Link } from "wouter";
import { useState } from "react";
import { products } from "@/lib/products";
import {
  ArrowRight,
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
 * صفحة تفاصيل المنتج بأسلوب Kinguin - نسخة العرض فقط:
 * - تم حذف أيقونات السلة والحساب من الهيدر تماماً.
 * - تم حذف زر "أضف إلى السلة" من صندوق الشراء الجانبي.
 * - بقاء خيارات الكمية، السعر، والضمانات كما هي.
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

  const hasDiscount = !!product.badge;
  const originalPrice = hasDiscount
    ? Math.round(product.price * (product.price >= 100 ? 1.45 : 1.65))
    : null;
  const discountPct = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;
  const savings = originalPrice ? originalPrice - product.price : null;

  const currencyLabel = product.currency === "ريال" ? "ر.س" : product.currency;

  const categoryLabel = (() => {
    switch (product.category) {
      case "os": return "أنظمة التشغيل";
      case "software": return "برامج الأوفيس";
      case "design": return "التصميم والإبداع";
      case "streaming": return "الترفيه والبث";
      case "iptv": return "اشتراكات IPTV";
      case "security": return "الخصوصية و VPN";
      case "ai": return "الذكاء الاصطناعي";
      default: return "منتج رقمي";
    }
  })();

  return (
    <div className="min-h-screen bg-[#f5f6fa] pb-16 font-['Cairo']" dir="rtl">
      {/* شريط التنقل العلوي - تم حذف السلة وحسابي نهائياً */}
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
          {/* عنصر فارغ للحفاظ على توازن التصميم */}
          <div className="w-10 sm:w-24"></div>
        </div>
      </nav>

      {/* مسار التنقل (Breadcrumb) */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          
          {/* العمود الرئيسي (التفاصيل) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-0">
                <div className="sm:col-span-2 relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  {hasDiscount && discountPct && (
                    <div className="absolute top-3 left-3 z-10 bg-[#ff6b35] text-white text-xs font-bold px-2 py-1 rounded shadow-md" dir="ltr">
                      -{discountPct}%
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="w-full max-w-[240px] object-contain" />
                </div>

                <div className="sm:col-span-3 p-5 sm:p-7 flex flex-col">
                  <div className="text-xs font-bold text-[#ff6b35] mb-2 uppercase">{categoryLabel}</div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#011627] mb-3">{product.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ffb400] text-[#ffb400]" />
                      ))}
                    </div>
                    <span className="text-sm font-bold">4.8</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded">منتج أصلي</span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">تسليم فوري</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
              <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#ff6b35] fill-[#ff6b35]" /> مميزات المنتج
              </h2>
              <div className="space-y-3">
                {product.description.split("\n").map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                    <span className="text-sm text-gray-700">{feature.replace("•", "").trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* العمود الجانبي (صندوق الشراء) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-bold text-green-600">متوفر الآن</span>
                  </div>
                  <div className="flex flex-col" dir="ltr">
                    {originalPrice && (
                      <span className="text-gray-400 text-sm line-through">{originalPrice} {currencyLabel}</span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-[#ff6b35]">{product.price.toFixed(2)}</span>
                      <span className="text-lg font-black">{currencyLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 border-b border-gray-100">
                  <label className="text-xs font-bold text-gray-400 mb-2 block">الكمية</label>
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center bg-gray-50 border rounded-lg">
                      <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2"><Minus className="w-4 h-4" /></button>
                      <span className="w-10 text-center font-bold">{qty}</span>
                      <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="p-2"><Plus className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* تم الإبقاء فقط على زر "اشترِ الآن" (أو يمكنك تغيير وجهته للدفع المباشر) */}
                  <Link href={`/checkout/${product.id}`}>
                    <button className="w-full bg-[#ff6b35] text-white py-4 rounded-xl font-black text-base hover:bg-[#e85a2a] transition-all flex items-center justify-center gap-2 active:scale-95">
                      <Zap className="w-5 h-5 fill-white" /> اشترِ الآن
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#0f3460] mt-0.5" />
                <div className="text-xs text-[#0f3460]">
                  <strong className="block mb-1">تسليم رقمي</strong>
                  ستصلك بيانات التفعيل فوراً بعد الدفع.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}