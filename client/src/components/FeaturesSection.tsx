import { features } from "@/lib/products";
import {
  ShieldCheck,
  Zap,
  Lock,
  Headphones,
  Award,
  CreditCard,
  Globe,
  RefreshCw,
} from "lucide-react";

/**
 * Kinguin-style Features Section (RTL)
 * بطاقات بيضاء على خلفية فاتحة بدل البطاقات الزجاجية الداكنة.
 * تم الحفاظ على البيانات `features` من `@/lib/products` بدون تعديل.
 */

// أيقونات احتياطية مرتّبة لتطابق ترتيب features (في حال لم يكن لكل ميزة icon خاص)
const FALLBACK_ICONS = [
  ShieldCheck,
  Zap,
  Lock,
  Headphones,
  Award,
  CreditCard,
  Globe,
  RefreshCw,
];

const ACCENTS = [
  { bg: "bg-[#ff6b35]/10", text: "text-[#ff6b35]" },
  { bg: "bg-[#0088cc]/10", text: "text-[#0088cc]" },
  { bg: "bg-emerald-500/10", text: "text-emerald-600" },
  { bg: "bg-purple-500/10", text: "text-purple-600" },
  { bg: "bg-yellow-500/10", text: "text-yellow-600" },
  { bg: "bg-rose-500/10", text: "text-rose-600" },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-14 md:py-20 bg-white font-['Cairo']"
      dir="rtl"
    >
      <div className="kg-container">
        {/* رأس القسم */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full px-3 py-1 text-xs font-black mb-3">
            <Award className="w-3.5 h-3.5" />
            لماذا نحن؟
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#011627] mb-3">
            لماذا تختار MEGA2U؟
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            نحن نقدم أفضل الخدمات والمميزات لعملائنا الكرام
          </p>
        </div>

        {/* شبكة المميزات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature: any, index: number) => {
            const Icon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];
            const accent = ACCENTS[index % ACCENTS.length];
            return (
              <div
                key={index}
                className="kg-card p-6 group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent.bg} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-6 h-6 ${accent.text}`} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base font-black text-[#011627] mb-2 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
