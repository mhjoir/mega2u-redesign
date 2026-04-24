import { Lock, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-[#0f3460] font-bold cursor-pointer"><ArrowRight className="w-5 h-5" />العودة للمتجر</Link>
          <h1 className="text-xl font-black text-[#0f3460]">سياسة الخصوصية</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 mt-10 space-y-8 text-right">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6 text-[#ff6b35]">
            <Lock className="w-8 h-8" />
            <h2 className="text-2xl font-bold">حماية بياناتك هي أولويتنا في MEGA2U</h2>
          </div>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>نحن نقدر ثقتكم بنا ونلتزم بحماية خصوصيتكم. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتكم الشخصية عند زيارة متجرنا أو الشراء منا.</p>
            
            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">1. المعلومات التي نجمعها</h3>
              <p>نجمع فقط المعلومات الضرورية لإتمام عملية الشراء والتواصل معكم، مثل الاسم، رقم الجوال، والمعلومات اللازمة للدفع. لا نقوم بجمع أي معلومات حساسة غير ضرورية.</p>
            </section>

            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">2. كيف نستخدم معلوماتكم</h3>
              <p>نستخدم معلوماتكم لمعالجة طلباتكم، تسليم المنتجات الرقمية، تقديم الدعم الفني عبر تيليجرام، وإبلاغكم بأي تحديثات هامة متعلقة باشتراكاتكم.</p>
            </section>
            
            <section>
              <h3 className="font-bold text-[#0f3460] mb-2">3. حماية وأمن المعلومات</h3>
              <p>نطبق إجراءات أمنية صارمة وتشفير متقدم لضمان حماية بياناتكم من الوصول غير المصرح به أو الكشف عنها. نحن لا نقوم ببيع أو مشاركة معلوماتكم مع أي أطراف ثالثة لأغراض تسويقية.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}