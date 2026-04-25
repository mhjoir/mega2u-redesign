import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";

/**
 * Kinguin-style Login Page (RTL)
 * تخطيط من عمودين:
 *   - يمين: نموذج تسجيل الدخول
 *   - يسار: لوحة جانبية ترويجية بشارات الثقة
 *
 * متوافق مع backend الحالي (لم يتم تعديل أي API/منطق مصادقة).
 * النموذج هو مجرد واجهة جاهزة لربطها بـ /api/auth/login
 */
export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("الرجاء إدخال البريد وكلمة المرور");
      return;
    }
    setSubmitting(true);
    try {
      // ربط API الفعلي هنا (مثال: POST /api/auth/login)
      // const res = await fetch("/api/auth/login", { ... });
      await new Promise((r) => setTimeout(r, 700));
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/customer-portal");
    } catch {
      toast.error("فشل تسجيل الدخول، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-['Cairo']" dir="rtl">
      {/* شريط علوي مبسّط */}
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
          {/* ========== العمود الجانبي الترويجي ========== */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              className="rounded-3xl p-8 h-full text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #011627 0%, #0f3460 100%)",
              }}
            >
              <div className="absolute -left-12 -bottom-12 w-56 h-56 bg-[#ff6b35]/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-3 leading-tight">
                  مرحباً بعودتك إلى
                  <br />
                  <span className="text-[#ff6b35]">MEGA2U</span>
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-8">
                  سجّل دخولك للوصول إلى طلباتك وفواتيرك ومتابعة جميع
                  اشتراكاتك في مكان واحد.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-black">حساب آمن ومحمي</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        تشفير كامل لجميع بياناتك الشخصية
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-[#ff6b35]/20 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-[#ff6b35]" />
                    </div>
                    <div>
                      <div className="text-sm font-black">وصول فوري</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        لطلباتك ومفاتيح التفعيل في أي وقت
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                      <Headphones className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-black">دعم متخصص</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        فريق الدعم متاح على مدار الساعة
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========== نموذج تسجيل الدخول ========== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#e7eaf3] p-6 md:p-10">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black text-[#011627] mb-2">
                  تسجيل الدخول
                </h1>
                <p className="text-sm text-gray-600">
                  ليس لديك حساب؟{" "}
                  <Link
                    href="/register"
                    className="font-black text-[#ff6b35] hover:underline"
                  >
                    أنشئ حساباً جديداً
                  </Link>
                </p>
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* البريد الإلكتروني */}
                <div>
                  <label className="block text-xs font-black text-gray-700 mb-1.5">
                    البريد الإلكتروني
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

                {/* كلمة المرور */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black text-gray-700">
                      كلمة المرور
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-bold text-[#ff6b35] hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="kg-input !pr-11 !pl-11"
                      dir="ltr"
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#011627] transition-colors"
                      aria-label="إظهار/إخفاء كلمة المرور"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* تذكرني */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#ff6b35] focus:ring-[#ff6b35]"
                    />
                    تذكّرني على هذا الجهاز
                  </label>
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="kg-btn kg-btn-primary w-full !py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "جاري الدخول..." : "تسجيل الدخول"}
                </button>
              </form>

              {/* فاصل */}
              <div className="relative my-6">
                <div className="kg-divider" />
                <span className="absolute inset-0 -top-2.5 flex justify-center">
                  <span className="bg-white px-3 text-xs text-gray-500 font-bold">
                    أو
                  </span>
                </span>
              </div>

              {/* تسجيل دخول اجتماعي (Placeholders) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toast("ميزة قيد التطوير")}
                  className="kg-btn kg-btn-outline !py-3 text-sm"
                >
                  <span className="font-black">G</span>
                  متابعة بحساب Google
                </button>
                <button
                  type="button"
                  onClick={() => toast("ميزة قيد التطوير")}
                  className="kg-btn kg-btn-outline !py-3 text-sm"
                >
                  <span className="font-black"></span>
                  متابعة بحساب Apple
                </button>
              </div>

              <p className="text-[11px] text-gray-500 text-center mt-6 leading-relaxed">
                بمتابعتك، فإنك توافق على{" "}
                <Link href="/terms" className="kg-link">
                  شروط الاستخدام
                </Link>{" "}
                و{" "}
                <Link href="/privacy" className="kg-link">
                  سياسة الخصوصية
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
