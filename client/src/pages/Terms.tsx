import { Scale, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-[#0f3460] font-bold cursor-pointer"><ArrowRight className="w-5 h-5" />العودة للمتجر</Link>
          <h1 className="text-xl font-black text-[#0f3460]">شروط الاستخدام</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-10 space-y-8 text-right">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 text-[#ff6b35]">
            <Scale className="w-8 h-8" />
            <h2 className="text-2xl font-bold">اتفاقية شروط وأحكام MEGA2U</h2>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-orange-50 p-4 rounded-xl border-r-4 border-orange-500 text-sm flex gap-2 items-start">
                <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                <p>بمجرد إتمام عملية الشراء من متجرنا، فإنك توافق ضمنياً على كافة الشروط والأحكام المذكورة في هذه الصفحة.</p>
            </div>
            
            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">● طبيعة المنتجات</h3>
              <p>جميع منتجاتنا هي منتجات رقمية (اشتراكات، أكواد تفعيل، حسابات). يتم تسليمها إلكترونياً ولا نقوم بشحن أي منتجات ملموسة.</p>
            </section>

            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">● سياسة الضمان والاستخدام</h3>
              <p>نضمن لك عمل الاشتراك طوال الفترة المحددة في وصف المنتج. يمنع العميل من محاولة تغيير بيانات الحساب (الايميل أو كلمة المرور) للحسابات المشتركة، وفي حال مخالفة ذلك، يلغى الضمان فوراً دون تعويض.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}