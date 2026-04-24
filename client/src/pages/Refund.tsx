import { RefreshCcw, XCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-[#0f3460] font-bold cursor-pointer"><ArrowRight className="w-5 h-5" />العودة للمتجر</Link>
          <h1 className="text-xl font-black text-[#0f3460]">سياسة الاسترجاع</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-10 space-y-8 text-right">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 text-[#ff6b35]">
            <RefreshCcw className="w-8 h-8" />
            <h2 className="text-2xl font-bold">سياسة استرداد الأموال واستبدال المنتجات</h2>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="bg-red-50 p-4 rounded-xl flex items-start gap-3 border-r-4 border-red-500">
              <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
              <p className="text-sm font-bold text-red-950">نظراً لطبيعة المنتجات الرقمية وحساسيتها، لا يمكن استرجاع المنتج أو استرداد المبلغ بعد إتمام عملية التسليم للعميل، إلا في الحالات المحددة أدناه.</p>
            </div>

            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">● حالات التعويض أو الاستبدال</h3>
              <p>يتم تعويض العميل بحساب جديد أو كود بديل في حال وجود خلل فني في المنتج يمنعه من الاستخدام، بشرط التواصل معنا عبر تيليجرام خلال فترة الضمان المحددة.</p>
            </section>

            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">● إلغاء الطلبات قبل التسليم</h3>
              <p>يحق للعميل طلب إلغاء الطلب واسترداد المبلغ بالكامل إذا لم نتمكن من تسليم المنتج الرقمي له خلال المدة المتفق عليها (عادةً خلال 24 ساعة كحد أقصى).</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}