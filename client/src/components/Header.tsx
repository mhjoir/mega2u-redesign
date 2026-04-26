import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Send,
  AlertTriangle,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Heart,
  Headphones,
  Globe,
  Tv,
  Monitor,
  Brush,
  Bot,
  Shield,
  Gamepad2,
  Layers,
  ChevronLeft,
} from "lucide-react";
import { Link, useLocation } from "wouter";

/**
 * Kinguin-style Header (RTL)
 * بنية ثلاث طبقات:
 *   1) شريط ترويجي علوي (Top utility bar)
 *   2) الشريط الرئيسي: لوغو + شريط بحث مركزي + (مفضلة + حساب + سلة)
 *   3) شريط الفئات (Mega Menu) أسفل الشريط الرئيسي
 *
 * تم الحفاظ على المحتوى النصي والروابط من الهيدر الحالي:
 *   - "الموقع تحت الصيانة حالياً"
 *   - الروابط: الرئيسية، الخدمات، الشروط، الدعم الفني (تيليجرام)
 *   - زر "تواصل معنا"
 */
const CATEGORIES: Array<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}> = [
  { label: "الكل", icon: Layers, href: "#products" },
  { label: "أنظمة التشغيل", icon: Monitor, href: "#products" },
  { label: "برامج الأوفيس", icon: Layers, href: "#products" },
  { label: "التصميم والإبداع", icon: Brush, href: "#products" },
  { label: "الترفيه والبث", icon: Tv, href: "#products" },
  { label: "اشتراكات IPTV", icon: Gamepad2, href: "#products" },
  { label: "الخصوصية و VPN", icon: Shield, href: "#products" },
  { label: "الذكاء الاصطناعي", icon: Bot, href: "#products" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();
  const accountRef = useRef<HTMLDivElement>(null);

  const telegramLink = "https://t.me/mega2u_support";

  // إغلاق قائمة الحساب عند النقر خارجها
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // التمرير إلى قسم المنتجات (سلوك بحث ضمني بدون تعديل البيانات)
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 font-['Cairo']" dir="rtl">
      {/* ============== 1) الشريط الترويجي العلوي ============== */}
      <div className="bg-[#011627] text-white text-xs">
        <div className="kg-container flex items-center justify-between gap-3 py-1.5">
          <div className="flex items-center gap-2 text-[#ffb400] font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>الموقع تحت الصيانة حالياً</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-gray-300">
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#ff6b35] transition-colors"
            >
              <Headphones className="w-3.5 h-3.5" />
              الدعم الفني 24/7
            </a>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              العربية (SAR)
            </span>
          </div>
        </div>
      </div>

      {/* ============== 2) الشريط الرئيسي ============== */}
      <div className="bg-white border-b border-[#e7eaf3]">
        <div className="kg-container">
          <div className="flex items-center gap-3 sm:gap-5 py-3">
            {/* اللوغو */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-white font-black text-xl">M</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-black text-lg text-[#011627] tracking-tight leading-none">
                    MEGA<span className="text-[#ff6b35]">2U</span>
                  </span>
                  <span className="text-[10px] text-[#0f3460] font-bold mt-0.5">
                    منصة ميجا الرقمية
                  </span>
                </div>
              </div>
            </Link>

            {/* شريط البحث المركزي */}
            <form
              onSubmit={onSubmitSearch}
              className="flex-grow max-w-2xl hidden md:flex relative"
            >
              <div className="relative w-full flex">
                <input
                  type="text"
                  placeholder="ابحث عن منتج أو خدمة رقمية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="kg-input !rounded-l-none !rounded-r-xl !pr-12 !pl-32 !py-3"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <button
                  type="submit"
                  className="kg-btn kg-btn-primary !absolute !left-1 !top-1 !bottom-1 !rounded-lg !px-5 !py-0"
                >
                  بحث
                </button>
              </div>
            </form>

            {/* الإجراءات اليسرى: مفضلة + حساب + سلة */}
            <div className="flex items-center gap-1 sm:gap-2 mr-auto">
              {/* بحث على الموبايل (أيقونة فقط) */}
              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector("#products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#011627] hover:bg-[#f5f6fa] transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* المفضلة */}
              <button
                type="button"
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-[#011627] hover:bg-[#f5f6fa] transition-colors relative"
                aria-label="المفضلة"
              >
                <Heart className="w-5 h-5" />
              </button>
              {/* زر القائمة على الموبايل */}
              <button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#011627] hover:bg-[#f5f6fa] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="القائمة"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ============== 3) شريط الفئات (Mega Menu) ============== */}
        <div className="hidden md:block border-t border-[#e7eaf3] bg-white">
          <div className="kg-container">
            <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
              {/* القائمة الرئيسية */}
              <Link
                href="/"
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#011627] hover:bg-[#f5f6fa] hover:text-[#ff6b35] transition-colors whitespace-nowrap"
              >
                الرئيسية
              </Link>
              <a
                href="#products"
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#011627] hover:bg-[#f5f6fa] hover:text-[#ff6b35] transition-colors whitespace-nowrap"
              >
                الخدمات
              </a>

              <span className="w-px h-5 bg-[#e7eaf3] mx-1" />

              {/* فئات سريعة بأيقونات */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {CATEGORIES.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-[#f5f6fa] hover:text-[#ff6b35] transition-colors whitespace-nowrap"
                  >
                    <c.icon className="w-3.5 h-3.5" />
                    {c.label}
                  </a>
                ))}
              </div>

              <span className="w-px h-5 bg-[#e7eaf3] mx-1" />

              <Link
                href="/terms"
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#011627] hover:bg-[#f5f6fa] hover:text-[#ff6b35] transition-colors whitespace-nowrap"
              >
                الشروط
              </Link>

              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold text-[#0088cc] hover:bg-[#0088cc]/10 transition-colors whitespace-nowrap"
              >
                <Send className="w-4 h-4 -rotate-45" />
                تيليجرام
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* ============== قائمة الموبايل ============== */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e7eaf3] shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="kg-container py-4 space-y-3">
            {/* بحث الموبايل */}
            <form onSubmit={onSubmitSearch} className="relative">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                className="kg-input !pr-11"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>

            {/* روابط رئيسية */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-[#011627] hover:bg-[#f5f6fa]"
              >
                الرئيسية
              </Link>
              <a
                href="#products"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-[#011627] hover:bg-[#f5f6fa]"
              >
                الخدمات
              </a>
              <Link
                href="/terms"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-[#011627] hover:bg-[#f5f6fa]"
              >
                الشروط
              </Link>
              <Link
                href="/refund"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-bold text-[#011627] hover:bg-[#f5f6fa]"
              >
                سياسة الاسترجاع
              </Link>
            </div>

            <div className="kg-divider" />

            {/* فئات */}
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(1).map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-[#011627] bg-[#f5f6fa] hover:bg-[#ff6b35] hover:text-white transition-colors"
                >
                  <c.icon className="w-4 h-4" />
                  {c.label}
                </a>
              ))}
            </div>

            <div className="kg-divider" />

            {/* أزرار CTA */}
            <div className="space-y-2 pt-1">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="kg-btn kg-btn-primary w-full"
              >
                تسجيل الدخول
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/register");
                }}
                className="kg-btn kg-btn-outline w-full"
              >
                إنشاء حساب جديد
              </button>
              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="kg-btn kg-btn-dark w-full"
              >
                <Send className="w-4 h-4 -rotate-45" />
                تواصل معنا
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
