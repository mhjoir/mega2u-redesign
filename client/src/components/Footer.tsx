import {
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  ShieldCheck,
  Lock,
  Zap,
  CreditCard,
  Headphones,
  ChevronLeft,
} from "lucide-react";
import { Link } from "wouter";

/**
 * Kinguin-style Footer (RTL)
 * يتألف من ثلاث طبقات:
 *   - شريط شارات ثقة علوي (Trust strip)
 *   - شبكة 4 أعمدة بالمحتوى (Brand / Quick links / Customer / Contact)
 *   - شريط سفلي للحقوق + الروابط القانونية + التواصل الاجتماعي + طرق الدفع
 *
 * تم الحفاظ على جميع الروابط والمحتوى الحالي:
 *   /privacy, /terms, /refund, t.me/mega2u_support, support@mega2u.com
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const telegramLink = "https://t.me/mega2u_support";

  return (
    <footer className="bg-[#011627] text-white font-['Cairo']" dir="rtl">
      {/* ============== شريط شارات الثقة ============== */}
      <div className="border-b border-white/10">
        <div className="kg-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/15 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#ff6b35]" />
              </div>
              <div>
                <div className="text-sm font-black">تسليم فوري</div>
                <div className="text-[11px] text-gray-400">خلال ثوانٍ على إيميلك</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0088cc]/15 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0088cc]" />
              </div>
              <div>
                <div className="text-sm font-black">ضمان ذهبي</div>
                <div className="text-[11px] text-gray-400">طوال فترة الاشتراك</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-black">دفع آمن 100%</div>
                <div className="text-[11px] text-gray-400">بوابات مشفّرة بالكامل</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-black">دعم 24/7</div>
                <div className="text-[11px] text-gray-400">عبر تيليجرام والإيميل</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============== المحتوى الرئيسي للفوتر ============== */}
      <div className="kg-container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* العمود 1 — العلامة التجارية */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-11 h-11 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">M</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-black text-xl tracking-tight">
                  MEGA<span className="text-[#ff6b35]">2U</span>
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  منصة ميجا الرقمية
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-md">
              منصة ميجا الرقمية - خيارك الأول لأفضل الاشتراكات الترفيهية
              والبرمجيات الأصلية بأسعار منافسة وضمان كامل.
            </p>

            {/* اشتراك بالنشرة البريدية */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="text-sm font-black mb-1">اشترك ليصلك جديد العروض</div>
              <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
                خصومات حصرية وعروض موسمية لا تفوّت على بريدك مباشرة.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-grow bg-[#011627] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ff6b35] transition-colors"
                />
                <button
                  type="submit"
                  className="kg-btn kg-btn-primary !py-2.5 !px-4 text-sm"
                >
                  اشتراك
                </button>
              </form>
            </div>
          </div>

          {/* العمود 2 — روابط سريعة */}
          <div className="lg:col-span-2">
            <h4 className="font-black text-base mb-4 text-white">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  الرئيسية
                </Link>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  الخدمات
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  المميزات
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  العروض
                </a>
              </li>
            </ul>
          </div>

          {/* العمود 3 — العملاء */}
          <div className="lg:col-span-3">
            <h4 className="font-black text-base mb-4 text-white">
              منطقة العملاء
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/login"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  إنشاء حساب جديد
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-portal"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  لوحة التحكم
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  طلباتي
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-400 text-sm hover:text-[#ff6b35] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  سلة التسوق
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 4 — تواصل معنا */}
          <div className="lg:col-span-3">
            <h4 className="font-black text-base mb-4 text-white">
              تواصل معنا
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 text-gray-400 group"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#0088cc]/20 transition-colors shrink-0">
                    <Send className="w-4 h-4 text-[#0088cc] -rotate-45" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="text-[11px] text-gray-500">تيليجرام</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#ff6b35] transition-colors truncate">
                      @mega2u_support
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@mega2u.com"
                  className="flex items-start gap-3 text-gray-400 group"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#ff6b35]/20 transition-colors shrink-0">
                    <Mail className="w-4 h-4 text-[#ff6b35]" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="text-[11px] text-gray-500">البريد الإلكتروني</div>
                    <div className="text-sm font-bold text-white group-hover:text-[#ff6b35] transition-colors truncate">
                      support@mega2u.com
                    </div>
                  </div>
                </a>
              </li>
            </ul>

            {/* وسائل التواصل الاجتماعي */}
            <div className="mt-5">
              <div className="text-[11px] text-gray-500 mb-2 font-bold">
                تابعنا على
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1877f2]/20 hover:text-[#1877f2] text-gray-400 flex items-center justify-center transition-colors"
                  aria-label="فيسبوك"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1da1f2]/20 hover:text-[#1da1f2] text-gray-400 flex items-center justify-center transition-colors"
                  aria-label="تويتر"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#e4405f]/20 hover:text-[#e4405f] text-gray-400 flex items-center justify-center transition-colors"
                  aria-label="إنستغرام"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0088cc]/20 hover:text-[#0088cc] text-gray-400 flex items-center justify-center transition-colors"
                  aria-label="تيليجرام"
                >
                  <Send className="w-4 h-4 -rotate-45" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============== شريط طرق الدفع ============== */}
      <div className="border-t border-white/10">
        <div className="kg-container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <span className="font-bold">طرق الدفع المتاحة:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* أكواد ASCII لطرق الدفع — يمكن استبدالها بأيقونات مخصّصة */}
              {["VISA", "MC", "MADA", "APPLE PAY", "STC PAY"].map((p) => (
                <span
                  key={p}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[10px] font-black text-gray-300 tracking-wider"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============== شريط الحقوق السفلي ============== */}
      <div className="bg-black/30 border-t border-white/5">
        <div className="kg-container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-xs text-center md:text-right">
              © {currentYear} <strong className="text-gray-300">MEGA2U</strong>{" "}
              — جميع الحقوق محفوظة.
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-[#ff6b35] transition-colors font-bold"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#ff6b35] transition-colors font-bold"
              >
                شروط الاستخدام
              </Link>
              <Link
                href="/refund"
                className="hover:text-[#ff6b35] transition-colors font-bold"
              >
                سياسة الاسترجاع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
