import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  User,
  Phone,
  Check,
  Gift,
  ShieldCheck,
  Star,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Kinguin-style Register Page (RTL)
 * تخطيط من عمودين بنفس روح صفحة تسجيل الدخول.
 * النموذج جاهز للربط بـ /api/auth/register دون أي تعديل في backend.
 */
export default function Register() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("الرجاء تعبئة الحقول الإلزامية");
      return;
    }
    if (password.length < 6) {
      toast.error("كلمة المرور يجب ألا تقلّ عن 6 أحرف");
      return;
    }
    if (!agree) {
      toast.error("يجب الموافقة على الشروط لإكمال التسجيل");
      return;
    }
    setSubmitting(true);
    try {
      // ربط API الفعلي هنا (مثال: POST /api/auth/register)
      await new Promise((r) => setTimeout(r, 700));
      toast.success("تم إنشاء الحساب بنجاح، أهلاً بك في MEGA2U");
      navigate("/customer-portal");
    } catch {
      toast.error("فشل التسجيل، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-['Cairo']" dir="rtl">
      <nav className="bg-white border-b border-[#e7eaf3] sticky top-0 z-40">
        <div className="kg-container flex items-center justify-between py-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-bold text-[#011627] hover:text-[#ff6b35] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">M</span>
            </div>
            <span className="font-black text-base text-[#011627]">
              MEGA<span className="text-[#ff6b35]">2U</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="kg-container py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 max-w-6xl mx-auto">
          {/* العمود الجانبي الترويجي */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              className="rounded-3xl p-8 h-full text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #e85a2a 100%)",
              }}
            >
              <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#011627]/30 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                  انضم لعائلة
                  <br />
                  <span className="text-[#011627]">MEGA2U</span>
                </h2>
                <p className="text-sm text-white/90 leading-relaxed mb-8">
                  أنشئ حسابك مجاناً واستمتع بأفضل العروض والخصومات على
                  جميع المنتجات الرقمية.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black">عروض حصرية</div>
                      <div className="text-[11px] opacity-90 mt-0.5">
                        خصومات للأعضاء فقط طوال العام
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black">نقاط ولاء</div>
                      <div className="text-[11px] opacity-90 mt-0.5">
                        اربح نقاطاً مع كل عملية شراء
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black">حماية كاملة</div>
                      <div className="text-[11px] opacity-90 mt-0.5">
                        ضمان استرجاع وحماية المشتريات
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* نموذج التسجيل */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#e7eaf3] p-6 md:p-10">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black text-[#011627] mb-2">
                  إنشاء حساب جديد
                </h1>
                <p className="text-sm text-gray-600">
                  لديك حساب بالفعل؟{" "}
                  <Link
                    href="/login"
                    className="font-black text-[#ff6b35] hover:underline"
                  >
                    سجّل دخولك
                  </Link>
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* الاسم */}
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1.5">
                    الاسم الكامل <span className="text-[#ff6b35]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: محمد البسّام"
                      className="kg-input !pr-11"
                    />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* البريد + الجوال */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-gray-700 mb-1.5">
                      البريد الإلكتروني <span className="text-[#ff6b35]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="kg-input !pr-11"
                        dir="ltr"
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-700 mb-1.5">
                      رقم الجوال
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9665XXXXXXXX"
                        className="kg-input !pr-11"
                        dir="ltr"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* كلمة المرور */}
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1.5">
                    كلمة المرور <span className="text-[#ff6b35]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="6 أحرف على الأقل"
                      className="kg-input !pr-11 !pl-11"
                      dir="ltr"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#011627] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {/* مؤشّر قوة كلمة المرور */}
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-grow rounded-full transition-colors ${
                          password.length >= i * 2
                            ? i <= 2
                              ? "bg-rose-500"
                              : i === 3
                              ? "bg-yellow-500"
                              : "bg-emerald-500"
                            : "bg-[#e7eaf3]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* الموافقة */}
                <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700 pt-1">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]"
                  />
                  <span className="leading-relaxed">
                    أوافق على{" "}
                    <Link href="/terms" className="kg-link">
                      شروط الاستخدام
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="kg-link">
                      سياسة الخصوصية
                    </Link>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="kg-btn kg-btn-primary w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                </button>

                {/* قائمة الفوائد */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3">
                  {[
                    "خصومات حصرية للأعضاء",
                    "تتبّع الطلبات بسهولة",
                    "حفظ المنتجات المفضّلة",
                  ].map((b) => (
                    <div
                      key={b}
                      className="flex items-center gap-1.5 text-[11px] text-gray-600"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
