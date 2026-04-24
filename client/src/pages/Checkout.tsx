import { useState } from "react";
import { useRoute, Link } from "wouter";
import { products } from "@/lib/products";
import { ArrowRight, CreditCard, Send, ShieldCheck } from "lucide-react";

export default function Checkout() {
  const [, params] = useRoute("/checkout/:id");
  const product = products.find((p) => String(p.id) === params?.id);

  if (!product) return <div className="text-center py-20">المنتج غير موجود</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-['Cairo']" dir="rtl">
      {/* Header */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href={`/product/${product.id}`} className="flex items-center gap-2 text-[#0f3460] font-bold cursor-pointer">
            <ArrowRight className="w-5 h-5" /> العودة للطلب
          </Link>
          <h1 className="text-xl font-black text-[#0f3460]">إتمام الشراء</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* قسم بيانات العميل */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#0f3460] mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#ff6b35]" /> معلومات التسليم
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                  <input type="text" placeholder="مثال: محمد البسّام" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#ff6b35] outline-none transition-all text-right" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال (واتساب أو تيليجرام)</label>
                  <input type="tel" placeholder="9665XXXXXXXX" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#ff6b35] outline-none transition-all text-left" dir="ltr" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#0f3460] mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#ff6b35]" /> طريقة الدفع
              </h2>
              <div className="p-4 border-2 border-[#ff6b35] bg-orange-50 rounded-2xl flex items-center justify-between">
                <span className="font-bold text-[#0f3460]">مدى / بطاقة ائتمانية</span>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ملخص الفاتورة (كأنك تراجع ميزانية يا محمد) */}
          <div className="space-y-6">
            <div className="bg-[#0f3460] text-white p-8 rounded-[2rem] shadow-xl sticky top-24">
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-4">ملخص الطلب</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-blue-200">{product.name}</span>
                <span className="font-bold">{product.price} {product.currency}</span>
              </div>
              <div className="flex justify-between items-center mb-6 pt-4 border-t border-white/10 text-xl font-black">
                <span>الإجمالي</span>
                <span className="text-[#ff6b35]">{product.price} {product.currency}</span>
              </div>
              <button className="w-full bg-[#ff6b35] text-white py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-lg shadow-orange-900/20">
                تأكيد الدفع والطلب
              </button>
              <div className="mt-6 flex items-center gap-2 text-xs text-blue-200 justify-center">
                <ShieldCheck className="w-4 h-4" /> دفع آمن ومشفر 100%
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}