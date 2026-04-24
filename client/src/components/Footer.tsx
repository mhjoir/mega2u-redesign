import { Mail, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 font-['Cairo']" dir="rtl">
      <div className="container mx-auto px-4">
        {/* المحتوى الرئيسي للفوتر */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* قسم الشعار */}
          <div className="text-right">
            <div className="flex items-center gap-2 mb-4 justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff8c5a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="font-bold text-lg tracking-tighter">MEGA<span className="text-[#ff6b35]">2U</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة ميجا الرقمية - خيارك الأول لأفضل الاشتراكات الترفيهية والبرمجيات الأصلية بأسعار منافسة وضمان كامل.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="text-right">
            <h4 className="font-bold text-lg mb-4 text-[#ff6b35]">الروابط السريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[#ff6b35] transition-colors cursor-pointer">الرئيسية</Link></li>
              <li><a href="#products" className="text-gray-400 hover:text-[#ff6b35] transition-colors">الخدمات</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-[#ff6b35] transition-colors">المميزات</a></li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div className="text-right">
            <h4 className="font-bold text-lg mb-4 text-[#ff6b35]">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#0088cc]/20 transition-colors">
                  <Send className="w-5 h-5 text-[#0088cc] -rotate-45" />
                </div>
                <a href="https://t.me/mega2u_support" target="_blank" rel="noreferrer" className="hover:text-[#ff6b35] transition-colors">
                  تيليجرام: @mega2u_support
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 group">
                <div className="bg-white/5 p-2 rounded-lg group-hover:bg-[#ff6b35]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#ff6b35]" />
                </div>
                <a href="mailto:support@mega2u.com" className="hover:text-[#ff6b35] transition-colors">
                  support@mega2u.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* فاصل خطي */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* الروابط القانونية - التي طلبتها */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} **MEGA2U**. جميع الحقوق محفوظة.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-gray-400">
  <Link href="/privacy" className="hover:text-[#ff6b35] transition-colors font-medium cursor-pointer">
    سياسة الخصوصية
  </Link>
  <span className="text-gray-800 hidden md:inline">|</span>
  
  <Link href="/terms" className="hover:text-[#ff6b35] transition-colors font-medium cursor-pointer">
    شروط الاستخدام
  </Link>
  <span className="text-gray-800 hidden md:inline">|</span>
  
  <Link href="/refund" className="hover:text-[#ff6b35] transition-colors font-medium cursor-pointer">
    سياسة الاسترجاع
  </Link>
  
</div>
          {/* وسائل التواصل */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-[#ff6b35] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="text-gray-400 hover:text-[#ff6b35] transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="text-gray-400 hover:text-[#ff6b35] transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}