import { useState } from "react";
import { Link, useLocation } from "wouter";
import { products } from "@/lib/products";
import {
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  ShieldCheck,
  Lock,
  Zap,
  ShoppingBag,
  Info,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Kinguin-style Cart Page (RTL)
 * تخطيط:
 *   - يمين (col-span-8): قائمة العناصر + كوبون الخصم
 *   - يسار (col-span-4): ملخّص الطلب (sticky) + شارات الثقة
 *
 * هذه الصفحة عرض واجهة فقط — تستخدم state محلي لمحاكاة العناصر.
 * يمكن ربطها بسهولة بمنطق الخادم/الـ context الحالي.
 */
type CartItem = {
  id: number | string;
  qty: number;
};

export default function Cart() {
  const [, navigate] = useLocation();

  // عرض ابتدائي بأول منتجَين كمثال (بدون تعديل بيانات المنتجات)
  const [items, setItems] = useState<CartItem[]>(() =>
    products.slice(0, 2).map((p) => ({ id: p.id, qty: 1 }))
  );
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; off: number } | null>(null);

  const lines = items
    .map((it) => {
      const product = products.find((p) => p.id === it.id);
      return product ? { ...it, product } : null;
    })
    .filter(Boolean) as Array<CartItem & { product: any }>;

  const subtotal = lines.reduce(
    (sum, l) => sum + Number(l.product.price) * l.qty,
    0
  );
  const couponDiscount = appliedCoupon ? subtotal * (appliedCoupon.off / 100) : 0;
  const total = Math.max(0, subtotal - couponDiscount);
  const currency = lines[0]?.product?.currency || "ر.س";

  const updateQty = (id: CartItem["id"], delta: number) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
        )
    );
  };

  const removeItem = (id: CartItem["id"]) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    toast.success("تمت إزالة المنتج من السلة");
  };

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      toast.error("الرجاء إدخال رمز الكوبون");
      return;
    }
    if (code === "MEGA10") {
      setAppliedCoupon({ code, off: 10 });
      toast.success("تم تطبيق خصم 10%");
    } else {
      toast.error("رمز الكوبون غير صالح");
    }
  };

  const checkout = () => {
    if (lines.length === 0) {
      toast.error("السلة فارغة");
      return;
    }
    // الانتقال لصفحة الدفع لأول عنصر (تماشياً مع المسار الحالي /checkout/:id)
    navigate(`/checkout/${lines[0].id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-['Cairo']" dir="rtl">
      {/* شريط علوي */}
      <nav className="bg-white border-b border-[#e7eaf3] sticky top-0 z-40">
        <div className="kg-container flex items-center justify-between py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-[#011627] hover:text-[#ff6b35] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            مواصلة التسوّق
          </Link>
          <h1 className="text-base font-black text-[#011627] flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#ff6b35]" />
            سلة التسوّق
          </h1>
        </div>
      </nav>

      <div className="kg-container py-6 md:py-10">
        {/* breadcrumb */}
        <div className="mb-5 text-xs text-gray-500 font-bold flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#ff6b35]">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-[#011627]">سلة التسوّق</span>
        </div>

        {lines.length === 0 ? (
          /* ====== سلة فارغة ====== */
          <div className="kg-card p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#f5f6fa] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="text-lg font-black text-[#011627] mb-2">
              سلتك فارغة حالياً
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              تصفّح خدماتنا وأضف المنتجات إلى سلتك للبدء
            </p>
            <Link href="/#products" className="kg-btn kg-btn-primary inline-flex">
              ابدأ التسوّق
            </Link>
          </div>
        ) : (
          /* ====== المحتوى ====== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* قائمة العناصر */}
            <div className="lg:col-span-8 space-y-4">
              <section className="kg-card overflow-hidden">
                <header className="flex items-center justify-between px-5 py-4 border-b border-[#e7eaf3]">
                  <h2 className="text-sm font-black text-[#011627]">
                    العناصر في سلتك ({lines.length})
                  </h2>
                  <button
                    onClick={() => {
                      setItems([]);
                      toast.success("تم تفريغ السلة");
                    }}
                    className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    تفريغ السلة
                  </button>
                </header>

                <ul className="divide-y divide-[#e7eaf3]">
                  {lines.map((l) => {
                    const lineTotal = Number(l.product.price) * l.qty;
                    return (
                      <li
                        key={l.id}
                        className="px-5 py-4 flex flex-col sm:flex-row gap-4"
                      >
                        {/* الصورة */}
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center overflow-hidden shrink-0"
                          style={{ background: l.product.color || "#f5f6fa" }}
                        >
                          {l.product.image ? (
                            <img
                              src={l.product.image}
                              alt={l.product.name}
                              className="max-w-[70%] max-h-[70%] object-contain"
                            />
                          ) : (
                            <span className="text-white font-black">
                              {l.product.name?.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* تفاصيل */}
                        <div className="flex-grow min-w-0">
                          <Link
                            href={`/product/${l.product.id}`}
                            className="text-sm font-black text-[#011627] hover:text-[#ff6b35] line-clamp-2"
                          >
                            {l.product.name}
                          </Link>
                          {l.product.duration && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              المدة: {l.product.duration}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold">
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              متوفر
                            </span>
                            <span className="bg-[#ff6b35]/10 text-[#ff6b35] px-2 py-0.5 rounded-full">
                              تسليم فوري
                            </span>
                          </div>
                        </div>

                        {/* الكمية */}
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                          <div className="inline-flex items-center border border-[#e7eaf3] rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateQty(l.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f6fa] disabled:opacity-40"
                              disabled={l.qty <= 1}
                              aria-label="إنقاص الكمية"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-black text-[#011627]">
                              {l.qty}
                            </span>
                            <button
                              onClick={() => updateQty(l.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#f5f6fa]"
                              aria-label="زيادة الكمية"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-left">
                            <div className="text-base font-black text-[#011627]">
                              {lineTotal.toFixed(2)} {currency}
                            </div>
                            {l.qty > 1 && (
                              <div className="text-[11px] text-gray-500">
                                {l.product.price} × {l.qty}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => removeItem(l.id)}
                            className="text-rose-600 hover:bg-rose-50 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="إزالة المنتج"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* كوبون الخصم */}
              <section className="kg-card p-5">
                <h3 className="text-sm font-black text-[#011627] mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#ff6b35]" />
                  هل لديك كوبون خصم؟
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="أدخل رمز الكوبون"
                    className="kg-input"
                  />
                  <button onClick={applyCoupon} className="kg-btn kg-btn-dark">
                    تطبيق
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 flex items-center justify-between">
                    <span>
                      تم تطبيق الكوبون{" "}
                      <span className="font-black">{appliedCoupon.code}</span> —
                      خصم {appliedCoupon.off}%
                    </span>
                    <button
                      onClick={() => {
                        setAppliedCoupon(null);
                        toast.success("تم إلغاء الكوبون");
                      }}
                      className="text-emerald-700 hover:underline"
                    >
                      إلغاء
                    </button>
                  </div>
                )}
                <p className="mt-2 text-[11px] text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  جرّب الكوبون التجريبي{" "}
                  <span className="font-black text-[#011627]">MEGA10</span> للحصول
                  على خصم 10%.
                </p>
              </section>
            </div>

            {/* ملخّص الطلب */}
            <aside className="lg:col-span-4">
              <div className="kg-card p-5 lg:sticky lg:top-20">
                <h3 className="text-sm font-black text-[#011627] mb-4">
                  ملخّص الطلب
                </h3>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>المجموع الفرعي</span>
                    <span className="font-bold text-[#011627]">
                      {subtotal.toFixed(2)} {currency}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700">
                      <span>خصم الكوبون ({appliedCoupon.off}%)</span>
                      <span className="font-bold">
                        − {couponDiscount.toFixed(2)} {currency}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>الضريبة</span>
                    <span className="font-bold text-[#011627]">شاملة</span>
                  </div>
                </div>

                <div className="kg-divider my-4" />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-bold text-gray-600">
                    الإجمالي
                  </span>
                  <span className="text-2xl font-black text-[#ff6b35]">
                    {total.toFixed(2)} {currency}
                  </span>
                </div>

                <button
                  onClick={checkout}
                  className="kg-btn kg-btn-primary w-full !py-3.5 text-base mt-4 kg-glow"
                >
                  المتابعة إلى الدفع
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* شارات ثقة */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <TrustItem icon={ShieldCheck} label="ضمان ذهبي" tone="green" />
                  <TrustItem icon={Lock} label="دفع آمن" tone="orange" />
                  <TrustItem icon={Zap} label="تسليم فوري" tone="blue" />
                </div>

                <p className="mt-4 text-[11px] text-gray-500 text-center leading-relaxed">
                  بمتابعتك، فإنك توافق على{" "}
                  <Link href="/terms" className="kg-link">
                    شروط الاستخدام
                  </Link>{" "}
                  و{" "}
                  <Link href="/refund" className="kg-link">
                    سياسة الاسترجاع
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  label,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone: "green" | "orange" | "blue";
}) {
  const map = {
    green: "bg-emerald-500/10 text-emerald-600",
    orange: "bg-[#ff6b35]/10 text-[#ff6b35]",
    blue: "bg-[#0088cc]/10 text-[#0088cc]",
  }[tone];
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${map}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-[10px] font-bold text-gray-600">{label}</span>
    </div>
  );
}
