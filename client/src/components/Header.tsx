import { useState } from 'react';
import { Menu, X, Send, AlertTriangle } from 'lucide-react'; 
import { Link } from 'wouter'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // إعداد رابط التيليجرام للدعم الفني
  const telegramLink = "https://t.me/mega2u_support";

  return (
    <header className="sticky top-0 z-50 shadow-sm" dir="rtl">
      {/* شريط التنبيه - جعلنا الحاوية بالكامل تومض باستخدام animate-pulse */}
      <div className="bg-[#ff6b35] text-white py-2 px-4 flex items-center justify-center gap-2 text-sm md:text-base font-bold animate-pulse">
        <AlertTriangle className="w-4 h-4" />
        <span>الموقع تحت الصيانة حالياً</span>
      </div>

      {/* محتوى الهيدر الرئيسي */}
      <div className="bg-white/95 backdrop-blur-sm border-b-2 border-[#ff6b35]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo - الضغط عليه يعيد للرئيسية */}
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-lg text-[#1a1a1a] tracking-tighter">MEGA<span className="text-[#ff6b35]">2U</span></span>
                  <span className="text-[10px] text-[#0f3460] font-bold">منصة ميجا الرقمية</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors cursor-pointer">
                الرئيسية
              </Link>
              <a href="#products" className="text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors cursor-pointer">
                الخدمات
              </a>
              <Link href="/terms" className="text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors cursor-pointer">
                الشروط
              </Link>
              <a href={telegramLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#0f3460] font-bold hover:text-[#0088cc] transition-colors">
                <Send className="w-4 h-4 -rotate-45" />
                الدعم الفني
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a href={telegramLink} target="_blank" rel="noreferrer">
                <button className="bg-[#0f3460] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#ff6b35] transition-all shadow-md active:scale-95">
                  تواصل معنا
                </button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#1a1a1a]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1a1a1a]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pb-6 border-t border-gray-100 pt-4 space-y-4 animate-in fade-in slide-in-from-top-2">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors">
                الرئيسية
              </Link>
              <a href="#products" onClick={() => setIsMenuOpen(false)} className="block text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors">
                الخدمات
              </a>
              <Link href="/refund" onClick={() => setIsMenuOpen(false)} className="block text-[#1a1a1a] font-bold hover:text-[#ff6b35] transition-colors">
                سياسة الاسترجاع
              </Link>
              <a 
                href={telegramLink} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 text-[#0088cc] font-bold"
              >
                <Send className="w-5 h-5 -rotate-45" />
                الدعم عبر تيليجرام
              </a>
              <a href={telegramLink} target="_blank" rel="noreferrer" className="block pt-2">
                <button className="w-full bg-[#ff6b35] text-white py-3 rounded-xl font-bold shadow-lg">
                  ابدأ الآن
                </button>
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}